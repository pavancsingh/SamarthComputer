/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy compatibility
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
        primary: {
          DEFAULT: '#DC2626',
          dark: '#B91C1C',
          light: '#FECACA',
        },
        secondary: {
          DEFAULT: '#B91C1C',
          cyan: '#DC2626',
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

        // Google Stitch Design Tokens
        stitch: {
          red: '#DC2626',
          'red-dark': '#B91C1C',
          'red-light': '#FEF2F2',
          'red-border': '#FECACA',
          navy: '#0B132B',
          'slate-dark': '#0F172A',
          'slate-card': '#182238',
          ivory: '#FAFAFA',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          'border-strong': '#CBD5E1',
          emerald: '#10B981',
          amber: '#F59E0B',
          indigo: '#6366F1',
        }
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(220, 38, 38, 0.08)',
        'soft-lg': '0 20px 40px -15px rgba(220, 38, 38, 0.14)',
        'glass': '0 8px 32px 0 rgba(220, 38, 38, 0.06)',
        'stitch-sm': '0 2px 8px -2px rgba(15, 23, 42, 0.05)',
        'stitch-md': '0 8px 24px -4px rgba(15, 23, 42, 0.08)',
        'stitch-lg': '0 16px 40px -8px rgba(15, 23, 42, 0.12)',
        'stitch-glow': '0 0 30px -5px rgba(220, 38, 38, 0.25)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      fontFamily: {
        heading: ['Outfit', '-apple-system', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        marathi: ['Mukta', 'Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

