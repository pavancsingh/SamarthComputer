/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── Google Stitch Design Tokens (exact match from Stitch HTML) ───
        primary: '#b7000e',
        'on-primary': '#ffffff',
        'primary-container': '#dd2423',
        'on-primary-container': '#fff6f5',
        'primary-fixed': '#ffdad5',
        'primary-fixed-dim': '#ffb4aa',
        'on-primary-fixed': '#410002',
        'on-primary-fixed-variant': '#930009',
        'inverse-primary': '#ffb4aa',

        secondary: '#565e74',
        'on-secondary': '#ffffff',
        'secondary-container': '#dae2fd',
        'on-secondary-container': '#5c647a',
        'secondary-fixed': '#dae2fd',
        'secondary-fixed-dim': '#bec6e0',
        'on-secondary-fixed': '#131b2e',
        'on-secondary-fixed-variant': '#3f465c',

        tertiary: '#483ede',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#625bf8',
        'on-tertiary-container': '#fbf7ff',
        'tertiary-fixed': '#e2dfff',
        'tertiary-fixed-dim': '#c3c0ff',
        'on-tertiary-fixed': '#0f0069',
        'on-tertiary-fixed-variant': '#3323cc',

        background: '#f7f9fb',
        'on-background': '#191c1e',
        surface: '#f7f9fb',
        'surface-bright': '#f7f9fb',
        'surface-dim': '#d8dadc',
        'surface-tint': '#c00311',
        'surface-variant': '#e0e3e5',
        'on-surface': '#191c1e',
        'on-surface-variant': '#5c403c',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2f4f6',
        'surface-container': '#eceef0',
        'surface-container-high': '#e6e8ea',
        'surface-container-highest': '#e0e3e5',

        'inverse-surface': '#2d3133',
        'inverse-on-surface': '#eff1f3',

        outline: '#916f6b',
        'outline-variant': '#e6bdb8',

        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',

        // Stitch semantic color aliases
        'text-primary': '#1E293B',
        'stitch-slate-card': '#1E293B',
        'stitch-red-light': '#FEF2F2',
        'stitch-red-dark': '#991B1B',
        'stitch-red-border': '#FCA5A5',
        'stitch-ivory': '#FAFAF9',
        'stitch-emerald': '#059669',

        // Legacy compatibility (keep for existing components not yet migrated)
        'rose-red': {
          DEFAULT: '#DC2626',
          deep: '#B91C1C',
          soft: '#FEF2F2',
          light: '#FECACA',
          accent: '#EF4444',
          secondary: '#B91C1C',
          muted: '#71717A',
        },
        ivory: {
          DEFAULT: '#FAFAFA',
          card: '#FFFFFF',
          warm: '#F4F4F5',
          dark: '#E4E4E7',
        },
        charcoal: {
          DEFAULT: '#09090B',
          muted: '#52525B',
          light: '#71717A',
        },
        accent: {
          DEFAULT: '#EF4444',
          gold: '#F59E0B',
          amber: '#D97706',
          warm: '#FEF2F2',
        },
        whatsapp: {
          DEFAULT: '#25d366',
          dark: '#16a34a',
        },
        navy: {
          dark: '#0A192F',
          slate: '#0F172A',
        },
        stitch: {
          red: '#b7000e',
          'red-dark': '#991B1B',
          'red-light': '#FEF2F2',
          'red-border': '#FCA5A5',
          navy: '#0B132B',
          'slate-dark': '#1E293B',
          'slate-card': '#1E293B',
          ivory: '#FAFAFA',
          surface: '#f7f9fb',
          border: '#e0e3e5',
          'border-strong': '#CBD5E1',
          emerald: '#059669',
          amber: '#F59E0B',
          indigo: '#4F46E5',
          'indigo-dark': '#3730A3',
          'indigo-light': '#EEF2FF',
          'indigo-container': '#E0E7FF',
          whatsapp: '#25d366',
          amber2: '#D97706',
        },
      },

      // ─── Stitch Spacing Tokens ───
      spacing: {
        xs: '4px',
        sm: '8px',
        base: '8px',
        md: '16px',
        lg: '24px',
        gutter: '24px',
        xl: '48px',
        '2xl': '80px',
        'container-max': '1280px',
      },

      // ─── Stitch Font Families ───
      fontFamily: {
        heading: ['Inter', '-apple-system', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'display-hero': ['Inter', 'sans-serif'],
        'display-hero-mobile': ['Inter', 'sans-serif'],
        'headline-lg': ['Inter', 'sans-serif'],
        'headline-md': ['Inter', 'sans-serif'],
        'label-bold': ['Inter', 'sans-serif'],
        'label-caps': ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
        marathi: ['Noto Sans Devanagari', 'sans-serif'],
        'marathi-body': ['Noto Sans Devanagari', 'sans-serif'],
      },

      // ─── Stitch Font Sizes ───
      fontSize: {
        'display-hero': ['60px', { lineHeight: '72px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-hero-mobile': ['36px', { lineHeight: '44px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.75', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-bold': ['14px', { lineHeight: '20px', letterSpacing: '0.01em', fontWeight: '600' }],
        'label-caps': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '700' }],
        'marathi-body': ['16px', { lineHeight: '1.8', fontWeight: '400' }],
      },

      // ─── Border Radius ───
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        full: '9999px',
      },

      // ─── Box Shadows ───
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(183, 0, 14, 0.08)',
        'soft-lg': '0 20px 40px -15px rgba(183, 0, 14, 0.14)',
        'glass': '0 8px 32px 0 rgba(183, 0, 14, 0.06)',
        'stitch-sm': '0 2px 8px -2px rgba(15, 23, 42, 0.05)',
        'stitch-md': '0 8px 24px -4px rgba(15, 23, 42, 0.08)',
        'stitch-lg': '0 16px 40px -8px rgba(15, 23, 42, 0.12)',
        'stitch-glow': '0 0 30px -5px rgba(183, 0, 14, 0.25)',
        'stitch-card': '0 10px 25px -5px rgba(183, 0, 14, 0.1), 0 8px 10px -6px rgba(183, 0, 14, 0.1)',
      },
    },
  },
  plugins: [],
}
