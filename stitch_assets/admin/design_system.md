---
name: Indigo Admin Architecture
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd8e5'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#f0ecf9'
  surface-container-high: '#eae6f4'
  surface-container-highest: '#e4e1ee'
  on-surface: '#1b1b24'
  on-surface-variant: '#464555'
  inverse-surface: '#302f39'
  inverse-on-surface: '#f3effc'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  background: '#fcf8ff'
  on-background: '#1b1b24'
  surface-variant: '#e4e1ee'
  success-emerald: '#10B981'
  warning-amber: '#F59E0B'
  error-rose: '#F43F5E'
  surface-slate: '#F8FAFC'
  border-slate: '#E2E8F0'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 1.5rem
---

## Brand & Style

The design system for Samarth Computers is rooted in **Corporate Modernism** with a heavy emphasis on **Information Density** and **Operational Efficiency**. The system is tailored for an administrative environment where clarity and rapid data processing are paramount.

The brand personality is authoritative yet approachable—blending the technical precision of a computer institute with the reliability of a government service provider. 

**Key Style Principles:**
- **High-Density Utility:** Layouts prioritize data visibility, reducing vertical scrolling in favor of structured grids and information-packed tables.
- **Functional Clarity:** Using a strict "Indigo and Slate" hierarchy to guide the user's eye toward primary actions while maintaining a calm, focused environment.
- **Tactile Softness:** Despite the data-heavy nature, the UI employs 12px rounding and subtle shadows to prevent the interface from feeling "sharp" or "dated."
- **Interactive Precision:** Framer Motion-driven transitions provide non-distracting feedback during tab switches and modal entries.

## Colors

This design system utilizes a structured **Light Mode** palette designed for long-duration usage without visual fatigue.

- **Primary Indigo (#4F46E5):** Used for primary actions, active navigation states, and brand-critical elements.
- **Secondary Slate (#64748B):** Reserved for supporting text, iconography, and non-primary UI controls.
- **Functional Spectrum:** 
    - **Emerald:** Positive status updates (e.g., "Completed" leads, "Active" batches).
    - **Amber:** Warnings and pending states (e.g., "In Process" leads).
    - **Rose:** Destructive actions and critical errors.
- **Surface & Borders:** A combination of `surface-slate` for background fills and `border-slate` for structural dividers ensures a clean separation of concerns without high-contrast jarring.

## Typography

The system uses **Inter** exclusively to leverage its exceptional legibility in data-heavy environments. 

- **Scale:** The scale is compact to accommodate high-density dashboards. `body-md` (14px) is the standard for data tables and form inputs.
- **Emphasis:** `headline-xl` is reserved for page titles, while `label-sm` is used for metadata and table headers.
- **Letter Spacing:** Headlines utilize slight negative tracking (-0.02em) to maintain a modern, tight aesthetic.
- **Mobile Adaptation:** On mobile, `headline-xl` scales down to the `headline-lg` size (20px) to prevent layout breaking.

## Layout & Spacing

This design system follows a **12-column Fixed Grid** for desktop, maxing out at 1440px to ensure line lengths remain readable for administrative staff.

- **Spacing Rhythm:** Based on an 8px (0.5rem) base unit.
- **Dashboard Structure:** A persistent left sidebar (280px) for tab navigation is paired with a main content area that utilizes a fluid grid within its fixed container.
- **Tab Navigation:** Horizontal scrolling tabs are used for mobile views to maintain access to all 9 management sections without clutter.
- **Breakpoints:**
    - **Mobile (<768px):** Single column, 1rem margins, hidden sidebar (drawer-based).
    - **Tablet (768px - 1024px):** Condensed sidebar (icons only), 1.5rem margins.
    - **Desktop (>1024px):** Full sidebar, 2rem margins, 1.5rem gutter between dashboard cards.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows** to create a sense of organized modularity.

- **Surface Levels:** 
    - **Level 0 (Background):** `surface-slate` (#F8FAFC).
    - **Level 1 (Cards/Sidebar):** Pure White (#FFFFFF).
    - **Level 2 (Modals/Popovers):** Pure White with elevated shadows.
- **Shadow Character:** Shadows are extra-diffused with low opacity. For standard cards, use a `0 4px 6px -1px rgb(0 0 0 / 0.05)`. For interactive elements (hovering), increase to `0 10px 15px -3px rgb(0 0 0 / 0.08)`.
- **Outlines:** All cards and inputs utilize a 1px solid border in `border-slate` (#E2E8F0) to ensure structural definition even in low-brightness environments.

## Shapes

The shape language is consistently **Rounded**, using a 12px (0.75rem) base for standard containers and buttons.

- **Small Components:** Checkboxes and small tags use a 4px (0.25rem) radius.
- **Standard Cards/Modals:** Always use a 12px (0.75rem) radius to match the requested aesthetic.
- **Search Inputs:** Utilize 8px (0.5rem) to maintain a crisp, functional look.
- **Interactive Elements:** Buttons follow the 12px standard, creating a "soft-square" appearance that feels modern and professional.

## Components

### Buttons & Inputs
- **Primary Button:** Indigo background, white text, 12px rounding. On hover, darken indigo by 10%.
- **Secondary Button:** White background, Slate border, Slate text.
- **Inputs:** 1px `border-slate` stroke. Focus state uses a 2px Indigo ring with an offset.

### Tab Navigation
- **Active State:** Primary Indigo text with a 2px bottom border. 
- **Inactive State:** Slate text.
- **Density:** Tabs should be packed closely (16px gap) with Lucide icons to the left of the label.

### Data Tables
- **Header:** `label-sm` typography with a light `surface-slate` background.
- **Rows:** Alternating "zebra" stripes are not required; use 1px bottom borders for separation.
- **Badges:** Use high-saturation backgrounds at 10% opacity with 100% opacity text for status indicators (e.g., Emerald background/text for "Completed").

### Image Cropper Modal
- **Overlay:** Backdrop blur (4px) with 50% Slate-900 opacity.
- **Canvas:** Centered with a thick white border; controls (Zoom/Rotate) positioned at the bottom in a floating pill-shaped container.

### Cards
- **Structure:** 1.5rem padding, 12px rounding, Level 1 shadow. 
- **Header:** Cards containing tables should have a header section with a title and action buttons (e.g., "Add New").
