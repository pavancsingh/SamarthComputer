# Samarth Computers Homepage Design Brief

## Scope and source of truth

This document describes the current public homepage and recommends a future visual-layout direction. It is based on the active React composition in `src/pages/Home/HomePage.jsx`, the public shell in `src/layouts/MainLayout.jsx`, the section components, and `src/index.css`.

It does not change the website. Business claims, bilingual content, contact details, course/service records, and admin-controlled settings must continue to come from the existing code and data sources.

## Current implementation

### Page and shell order

`MainLayout` surrounds the homepage with two announcement surfaces, the header, footer, mobile action bar, and mobile navigation drawer. `HomePage` then renders the following content order:

1. Emergency announcement banner
2. Utility announcement bar
3. Sticky header and navigation
4. Hero
5. Recognition / authorized-by strip
6. Key statistics
7. Featured courses
8. Combined About Samarth + Why Choose Us + mission
9. Online services
10. Batch timetable
11. Latest updates
12. Combined student success stories + Google reviews
13. Gallery + reels
14. Faculty
15. FAQ
16. Contact / branches / enquiry form
17. Final call, WhatsApp, and enquiry CTA
18. Footer

The mobile bottom action bar is fixed and sits outside this content flow. The main element reserves bottom space for it on mobile.

### Current typography

- English uses `Inter` for headings and body copy.
- Marathi uses `Noto Sans Devanagari`, with `Mukta` as fallback.
- The homepage root carries `lang={lang}`. Marathi headings receive the Devanagari font, a `1.42` line-height, and near-neutral tracking; Marathi text uses `1.9` line-height.
- Existing visual scale ranges from 10–12px labels, 12–16px body copy, 20–24px card headings, 30–48px section headings, and up to 60px hero display type on desktop.

### Current colors and component language

- Brand red: `#b7000e`; dark red: `#991B1B`; pale red: `#FEF2F2`.
- Primary text/slate: `#1E293B`; secondary text: `#565e74`.
- Neutral surface: `#f7f9fb`; white cards; ivory `#FAFAF9` section surfaces.
- Functional accents: emerald for calls/positive status, amber for highlights, indigo for supporting emphasis, and WhatsApp green.
- Sections use wide `max-w-7xl` containers, pale borders, 2xl/3xl rounded cards, modest shadows, and small upward hover motion.

### Dynamic and admin-controlled content

Do not replace these data flows with static content during a redesign:

- Hero, header, footer, final CTA, and About content read site settings from `sharedStore`; Hero also loads settings through `AdminRepository`.
- Courses use `CourseRepository` plus `sharedStore` subscriptions.
- CSC and government services use `InquiryRepository` plus `sharedStore` subscriptions.
- Batches, news, gallery, and faculty fetch through `AdminRepository` and retain `sharedStore` updates/fallbacks.
- Contact enquiry selects live courses/services and submits through the existing repositories.
- The gallery uses admin gallery records with current fallback media; social links come from settings.

## Recommended new homepage layout

This is a layout recommendation only. It keeps the current content order and avoids creating new business claims or new large sections.

### 1. Announcement bars

- **Purpose:** Surface time-sensitive admissions or operational notices before navigation.
- **Hierarchy:** Emergency notice first, utility information second; keep language switch and key contact information easy to find.
- **Recommended layout:** Treat both as one compact announcement zone with clearly distinct priority levels, not two competing banners.
- **Desktop / mobile:** Keep copy to one readable line on desktop; allow controlled wrapping or a concise marquee/summary on small screens without hiding the call-to-action.
- **Type / CTA:** 12–14px semibold; only one primary action per notice.
- **Keep / merge:** Keep both existing sources. Visually group them; do not duplicate the same admission message in both.

### 2. Header and navigation

- **Purpose:** Provide brand recognition, primary page navigation, language choice, and fast contact actions.
- **Hierarchy:** Logo and centre identity, navigation, then call/admission actions.
- **Recommended layout:** Preserve the sticky glass/white header and existing desktop navigation. Keep the mobile drawer and fixed bottom action bar as the small-screen navigation system.
- **Desktop / mobile:** Full navigation on desktop; menu trigger and compact action set on mobile.
- **Type / CTA:** Navigation 14–16px; one clearly primary admission action and one secondary call action.
- **Keep / merge:** Keep Header, Navbar, MobileNav, and MobileBottomBar. Do not move admin navigation into the public header.

### 3. Hero

- **Purpose:** Explain what Samarth Computers offers and provide the fastest route to call or explore courses.
- **Hierarchy:** Recognition badge → bilingual headline → concise course/service summary → address/lab guidance → call and course CTAs → institute image.
- **Recommended layout:** Retain the current two-column composition with text on the left and live hero image on the right; on a future refresh, reduce ornamental treatment before changing the content hierarchy.
- **Desktop / mobile:** Two columns at large widths; image follows CTAs in a single column on mobile. Preserve readable text before image loading.
- **Type / CTA:** Hero H1 is the only display-sized heading. Keep the green call action and red course action adjacent on desktop and stacked on mobile.
- **Keep / merge:** Preserve settings-driven title, subtitle, badge, image, phone, CTA text, and destination. Do not repeat the same recognition labels later in the hero.

### 4. Recognition / authorized-by

- **Purpose:** Establish official affiliations without competing with the hero.
- **Hierarchy:** Small section label, then the four existing authorization/service labels.
- **Recommended layout:** A restrained horizontal strip or grid; the current marquee can be replaced visually later only if all labels remain accessible and readable.
- **Desktop / mobile:** Horizontal row on desktop; horizontally scrollable or two-column grid on mobile.
- **Type / CTA:** 12px section label and 14–16px recognition labels; no CTA.
- **Keep / merge:** Keep only MKCL, Government of Maharashtra, CSC/MahaOnline, and MS-CIT labels. Do not reintroduce statistics, placement, sales, or repair claims here.

### 5. Key statistics

- **Purpose:** Give quick, factual scale indicators already present in the content baseline.
- **Hierarchy:** Value → label → short qualifier.
- **Recommended layout:** Four equal cards or a single divided statistics band. Use the existing icons and factual values.
- **Desktop / mobile:** Four columns on desktop; two columns on mobile with equal card height.
- **Type / CTA:** 30–40px values, 14–16px labels, 12px supporting text; no CTA.
- **Keep / merge:** Keep the current four metrics. Do not repeat them in the recognition strip or About heading.

### 6. Featured courses

- **Purpose:** Help prospective students compare the live featured course catalogue and take action.
- **Hierarchy:** Section label/title/summary → live course cards → topics/duration → details, call, and enrol actions → view-all CTA.
- **Recommended layout:** Keep the current three-card desktop grid and data-driven card rendering.
- **Desktop / mobile:** Three columns on large screens, one column on narrow screens, retaining card action targets large enough to tap.
- **Type / CTA:** Section H2; course H3; short body descriptions; keep enrol primary, details secondary, and call utility-level.
- **Keep / merge:** Preserve live course content, images/logos, durations, modules, navigation, and admission modal behavior.

### 7. Combined About Samarth + Why Choose Us + mission

- **Purpose:** Explain the centre, its teaching approach, and the existing mission points in one coherent trust-building section.
- **Hierarchy:** About image/settings-driven introduction → centre credentials → practical reasons to choose Samarth → mission/approach list.
- **Recommended layout:** Keep it as one section. The About image and text should introduce the two supporting cards rather than appear as a separate homepage destination.
- **Desktop / mobile:** About block can be a two-column row; reasons and mission remain two columns on desktop and stack on mobile.
- **Type / CTA:** One section H2; subordinate H3 labels for About, highlights, and approach. Keep the existing About page CTA only after the main explanation.
- **Keep / merge:** Keep the settings-backed About heading, description, image, credentials, highlights, and mission points. Do not create another standalone mission section.

### 8. Online services

- **Purpose:** Present live CSC/government services and help visitors find the right application service.
- **Hierarchy:** Service-centre label → title and short explanation → search → up to three live service cards → call/WhatsApp actions → all-services CTA.
- **Recommended layout:** Retain the current searchable grid and live record mapping.
- **Desktop / mobile:** Three cards on desktop; one card per row on mobile. Keep search above cards and controls full-width on small screens.
- **Type / CTA:** Title H2, service H3, compact document chips, paired call and WhatsApp actions.
- **Keep /merge:** Preserve both CSC and government service data, document lists, timelines, contact actions, and services-page navigation.

### 9. Batch timetable

- **Purpose:** Let visitors assess available batch times and begin a reservation/enquiry.
- **Hierarchy:** Schedule title and guidance → time-of-day grouping → batch time, seats/status, course category, reservation action.
- **Recommended layout:** Preserve the live schedule widget, using tabs or grouped cards only if the current records remain visible without interaction barriers.
- **Desktop / mobile:** Compact multi-column grouping on desktop; vertical time cards or horizontally scrollable tabs on mobile.
- **Type / CTA:** Time is the strongest text; availability is secondary but distinct; reservation CTA sits with each batch.
- **Keep / merge:** Preserve live admin batch records, time/category/status fields, and current enquiry/reservation behavior.

### 10. Latest updates

- **Purpose:** Surface admin-managed admission, exam, event, or scholarship notices.
- **Hierarchy:** Updates label/title → date/category → title → short description → read/enquire action.
- **Recommended layout:** Retain a three-card responsive grid with a consistent card height where possible.
- **Desktop / mobile:** Three columns on desktop, one column on mobile; avoid a carousel so notices remain scannable.
- **Type / CTA:** H2 then notice H3; category and date are metadata. Link to the existing inquiry anchor.
- **Keep / merge:** Preserve dynamic `AdminRepository.getAllNews()` data and `sharedStore` updates. Do not turn notices into static marketing cards.

### 11. Student success + Google reviews

- **Purpose:** Place student outcomes and public feedback in one proof section.
- **Hierarchy:** Success-section heading → student stories → visually separated ratings/review area → external Google review link.
- **Recommended layout:** Keep the current story grid followed by embedded review content in one semantic section. Use a divider rather than a new full-width section background.
- **Desktop / mobile:** Three story cards and three review cards on desktop; stack each group on mobile.
- **Type / CTA:** Story outcomes should be easier to scan than quotes; reviews keep star rating, author, date, and verification styling. Google link is secondary.
- **Keep / merge:** Keep every existing story and review record, the Google Maps link, and rating display. Do not render a separate homepage Reviews section.

### 12. Gallery + reels

- **Purpose:** Show campus, class, event, and social-media media in a single experience.
- **Hierarchy:** Gallery label/title/summary → social links → filters → media tiles → lightbox.
- **Recommended layout:** Keep the current unified gallery component and filters; do not split photos and reels into different homepage sections.
- **Desktop / mobile:** Four-column media grid at large widths, two columns at small tablet widths, one or two columns on phones based on image legibility.
- **Type / CTA:** Media title overlays are secondary to the image; Instagram/YouTube links are support actions.
- **Keep / merge:** Preserve admin gallery records, fallbacks, media filters, lightbox, and settings-driven social links.

### 13. Faculty

- **Purpose:** Introduce the active faculty records and their expertise.
- **Hierarchy:** Section title/intro → instructor identity and role → experience → specialization.
- **Recommended layout:** Keep the existing two-card maximum-width grid, live faculty fetch, and image fallback.
- **Desktop / mobile:** Two columns on desktop and one column on mobile.
- **Type / CTA:** Faculty name H3; role and experience are supporting text; no direct CTA needed.
- **Keep / merge:** Preserve AdminRepository faculty data and fallbacks. Do not make faculty claims outside the existing content.

### 14. FAQ

- **Purpose:** Reduce friction before contact by answering the existing common questions.
- **Hierarchy:** FAQ title → accordion question → answer → WhatsApp help prompt.
- **Recommended layout:** Maintain the single-column accordion and one expanded answer at a time.
- **Desktop / mobile:** Same single-column flow; buttons must remain full-width and comfortably tap-sized.
- **Type / CTA:** Question is a compact H3/button; answer is readable body text; WhatsApp is the final secondary CTA.
- **Keep / merge:** Keep current questions and direct WhatsApp help; do not duplicate admission content already answered above.

### 15. Contact / branches / enquiry

- **Purpose:** Provide locations, direct contact methods, map access, and the working course/service enquiry form.
- **Hierarchy:** Section heading → branch cards/map → direct call/WhatsApp actions → two-tab enquiry form.
- **Recommended layout:** Keep the current two-column desktop split, with branch information before the form on mobile.
- **Desktop / mobile:** 5/7 contact/form split on desktop; vertically stacked content on mobile. Inputs must remain at least a comfortable mobile tap height.
- **Type / CTA:** Branch names H3; addresses/body text; form labels unambiguous; submit is the single primary form CTA.
- **Keep / merge:** Preserve both branch records, ALC details, maps, live course/service selects, validation, repository submission, and WhatsApp follow-up.

### 16. Final call + WhatsApp CTA

- **Purpose:** Give one last concise decision point after contact information.
- **Hierarchy:** Outcome-oriented heading → short course/service prompt → call → WhatsApp → online enquiry.
- **Recommended layout:** Preserve the existing dark final CTA block and three actions. This is where the former career-counselling call to action belongs.
- **Desktop / mobile:** Text and action column side-by-side on desktop; actions stack below text on mobile.
- **Type / CTA:** H2, short paragraph, three large action buttons. Call is highest priority; WhatsApp and enquiry are complementary.
- **Keep / merge:** Preserve dynamic phone/WhatsApp settings and the scroll-to-inquiry behavior. Do not render the separate large counselling banner elsewhere.

### 17. Footer

- **Purpose:** Close the page with brand, contact, navigation, social links, legal links, certifications, and admin entry.
- **Hierarchy:** Brand/contact → course and service links → legal/certification links → copyright.
- **Recommended layout:** Keep the current responsive column layout and mobile bottom-padding relationship.
- **Desktop / mobile:** Multi-column desktop layout; stacked groups on mobile with legible link spacing.
- **Type / CTA:** Small but readable link type; direct call is the practical footer CTA. Admin portal remains low emphasis.
- **Keep / merge:** Preserve settings-backed logo/tagline/contact/social data and the current navigation targets.

## Design system recommendation

### Direction

Use a calm, credible training-centre interface: slate and white as the base, Samarth red for conversion and identity, emerald for phone/positive status, and restrained amber for highlights. Favor clarity, direct information, and locally useful actions over decorative effects.

### Typography system

- English: Inter, with 700–800 weights for H1/H2, 600–700 for H3 and buttons, and 400–500 for body copy.
- Marathi: Noto Sans Devanagari first, Mukta fallback. Maintain the existing 1.42 heading and 1.9 body line-height baseline.
- Do not use all-caps for Marathi. English labels may use small tracked caps sparingly.
- Keep one H1 in the hero; use one H2 per major section and H3 for cards/accordions.

### Spacing, cards, and borders

- Preserve the existing responsive section rhythm of roughly 64px mobile / 96px desktop vertical padding.
- Use 16–24px internal card padding, 16–24px grid gaps, and `max-w-7xl` page containers.
- Cards should have pale slate borders, 16–24px radii, white or very light neutral surfaces, and only low-to-medium shadows.
- Use hover lift only for clickable desktop cards; never rely on hover for meaning or access.

### Buttons

- Primary: Samarth red fill with white text; used for enrolment and form submission.
- Call: emerald fill; used for `tel:` actions.
- WhatsApp: WhatsApp green or dark slate with clear WhatsApp icon/text; used for chat only.
- Secondary: white/light neutral surface with a visible border.
- Buttons need clear visible focus, 44px minimum touch target, concise bilingual labels, and no duplicate competing primary CTA inside a single card.

### Responsive breakpoints

- Use the existing Tailwind progression: base/mobile, `sm` (640px), `md` (768px), `lg` (1024px), and `xl` (1280px).
- At base: one-column reading order, stacked CTAs, no clipped Marathi text, and mobile bottom-bar clearance.
- At `md`: two-column statistics and cards where content stays readable.
- At `lg`: hero, About, contact, and CTA split layouts; three-column course/service/story grids; four-column statistics.

### Accessibility

- Keep semantic `section`, heading, button, link, list, form label, and image `alt` usage.
- Maintain high contrast for text on red/slate/emerald surfaces; do not encode availability or validation only by color.
- Retain keyboard-operable menu, FAQ, filters, lightbox close control, and visible focus states.
- Respect touch target size, particularly course actions, filters, mobile navigation, and form controls.
- Announcements should not trap focus or animate in a way that prevents reading; marquee recognition content must remain available without animation.

### Do / don't rules

**Do** preserve real data bindings, bilingual copy, existing navigation targets, enquiry submissions, and the current factual claims only where they already exist.

**Do** reduce repeated content by keeping recognition, metrics, mission, reviews, counselling, and gallery content in their current merged locations.

**Don't** add new claims, testimonial outcomes, counts, certifications, service timelines, or placements.

**Don't** replace repository/shared-store data with static arrays, remove image fallbacks, or change Supabase/Admin/Auth behavior.

**Don't** create another standalone Mission, Career Counselling, Reviews, Reels, or recognition-statistics section.

## Consistency verification

This document matches the current implementation:

- `HomePage.jsx` renders the documented homepage sequence from Hero through Final CTA.
- `MainLayout.jsx` contributes both announcement bars, Header, Footer, mobile navigation, and mobile bottom action bar.
- About is embedded in `WhyChooseUs`; Reviews are embedded in `SuccessStories`; Gallery already combines photo and reel content; the standalone counselling component is not rendered on the homepage.
- `index.css` supplies the documented Inter/Noto Sans Devanagari/Mukta typography, language-aware line heights, color tokens, surfaces, shadows, and responsive mobile-bottom spacing.
- The documented data requirements match the repositories and `sharedStore` subscriptions used by current homepage components.
