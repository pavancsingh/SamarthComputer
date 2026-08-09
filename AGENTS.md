# Samarth Computers Khandala — AGENTS.md

## Project Overview
React 19 + Vite 6 + Tailwind CSS 3.4 single-page application for **Samarth Computers Khandala** (computer training center). Supabase (PostgreSQL + Storage) is the backend. Features: public website, admin dashboard (full CRUD), student certificate verification, bilingual (Marathi/English).

## Key Commands
```bash
npm run dev       # Start dev server on port 3000 (auto-opens browser)
npm run build     # Production build to dist/
npm run lint      # Alias for `vite build` (catches build errors)
npm run preview   # Preview production build locally
```

## Architecture & Entry Points
| File | Purpose |
|------|---------|
| `src/main.jsx` | React root render |
| `src/App.jsx` | App shell, routing via `currentView` state, wraps `AuthProvider` |
| `src/context/AuthContext.jsx` | Admin auth (Supabase + localStorage fallback), rate limiting, allowed emails |
| `src/lib/supabase.js` | Singleton Supabase client (anon key hardcoded, env vars optional) |
| `src/repositories/*.js` | Data access layer (AdminRepository, CourseRepository, InquiryRepository, sharedStore) |
| `src/services/StorageService.js` | Image upload to `samarth-media` bucket with Base64 fallback |

## Routing (Single-Page State)
`App.jsx:22` uses `currentView` state — not React Router. Views:
- `home`, `courses`, `details`, `csc`, `govt`, `about`, `faculty`, `gallery`, `contact`, `timetable`, `verification`, `admin`

Admin guard at `App.jsx:65-70`: shows `AdminDashboard` if `isAdmin`, else `AdminLoginPage`.

## Supabase Schema (from `supabase_schema.sql`)
Tables: `inquiries`, `courses`, `csc_services`, `govt_services`, `faculties`, `site_gallery`, `site_settings`, `batches`, `news`, `certificates` (used by verification page).

All tables have RLS enabled with **public read/write** policies (`FOR ALL USING (true)`). Storage bucket: `samarth-media` (public).

## Admin Authentication (`src/context/AuthContext.jsx`)
- Allowed emails: `pawansingh3760@gmail.com`, `admin@samarth.com`, `admin@samarthcomputers.in`, `admin`, `pavan`, `sagarbhosale`
- Password fallback: `Pavan@1137`, `samarth123`, `admin123`, `admin`, `Pavan@3760`
- Rate limit: 5 failed attempts → 60s lockout
- Session persisted in `localStorage` (`samarth_admin_session`)
- Supabase Auth attempted first, then local fallback

## Data Layer Pattern
Two parallel systems:
1. **AdminRepository** — Direct Supabase CRUD (source of truth for admin)
2. **sharedStore** — LocalStorage cache with `subscribe()` observers, syncs from Supabase on admin load

Frontend pages use repositories (`CourseRepository`, `InquiryRepository`) that query Supabase directly.

**Fixed**: `AdminRepository.getAllBatches()` now queries `batches` table (matches schema).

## Additional Fixes (This Session)
- **Missing `submitInquiry` method**: Added to `InquiryRepository.js` for contact form submissions
- **Field mapping inconsistency**: Fixed `InquiryRepository.getGovtServices()` to map `required_docs_mr/en` and `steps_mr/en` (matches schema/AdminRepository)
- **Missing Tailwind utilities**: Added `@layer utilities` in `src/index.css` for Stitch design tokens (`text-body-md`, `font-body-md`, `px-md`, `py-sm`, `form-input`, etc.)
- **Environment-only Supabase config**: Removed hardcoded credentials from `src/lib/supabase.js`

## Image Upload Flow
1. User selects file → `handleFileUpload` direct handler
2. Selected file → `StorageService.uploadImage()` → Supabase Storage `samarth-media/{folder}/`
3. Fallback: Base64 Data URL if Storage fails
4. Public URL returned → saved to DB record's `image_url` / `imageUrl`

## Bilingual Support
- `src/locales/en.json`, `mr.json` — translation files
- Components receive `lang` prop (`'mr'` | `'en'`)
- Data fields use dual naming: `title_mr`/`title_en`, `overview_mr`/`overview_en`, etc.
- Repositories normalize snake_case DB fields to camelCase for UI

## Constants (Fallback Data)
`src/constants/` — `coursesData.js`, `cscData.js`, `govtServicesData.js`, `studentCertificatesData.js`. Used by `sharedStore` as defaults when LocalStorage empty.

## Known Issues (All Fixed)
1. ~~**Table name mismatch**: `AdminRepository.getAllBatches()` queries `batch_timetable` but schema creates `batches` (line 133 in schema). Fix: change query to `from('batches')`.~~ ✅ Fixed in `src/repositories/AdminRepository.js`
2. ~~**StudentVerificationPage** queries `certificates` table which has no RLS policy in schema — add policy or table won't be readable.~~ ✅ Fixed in `supabase_schema.sql` (added certificates table with RLS policies)
3. ~~**AdminRepository.saveGovtService** maps `requirements_mr/en` but schema has `required_docs_mr/en` + `steps_mr/en` — field mismatch.~~ ✅ Fixed in `src/repositories/AdminRepository.js` (maps to correct schema fields)
4. ~~**Hardcoded Supabase credentials** in `src/lib/supabase.js:3-4` — should use only env vars in production.~~ ✅ Fixed in `src/lib/supabase.js` (removed hardcoded fallbacks)
5. ~~`sharedStore` sync functions (`syncBatchesFromRemote` etc.) expect `batch_timetable` data shape but AdminRepository fetches from wrong table.~~ ✅ Fixed — AdminRepository now queries correct `batches` table; sync function already matches schema

## Testing / Verification
No test framework configured. Verify manually:
- `npm run build` — must pass without errors
- `npm run dev` — open `http://localhost:3000`, check console for Supabase errors
- Admin login: use allowed email + `Pavan@1137`
- Test CRUD in each admin tab (Courses, CSC, Govt, Gallery, Faculty, Timetable, News, Settings)
- Test image upload in any edit form (crop modal should open)
- Test public pages: course details, CSC/Govt services, contact form submission

## File Conventions
- Components: PascalCase (`AdminDashboard.jsx`)
- Repositories/Services: PascalCase (`AdminRepository.js`, `StorageService.js`)
- Constants: UPPER_SNAKE_CASE exports (`COURSES_DATA`)
- Tailwind: uses custom design tokens from `tailwind.config.js` (colors, spacing, fonts)
- No TypeScript — plain JS with JSDoc comments

## Environment Variables
Create `.env` for production:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
Current hardcoded values work for the demo project.

## Deployment
- `npm run build` → `dist/` folder
- Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages)
- Supabase project must have schema applied and storage bucket created