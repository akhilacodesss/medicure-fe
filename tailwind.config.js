/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefbfa',
          100: '#d4f4f1',
          200: '#ade8e3',
          300: '#7bd6cf',
          400: '#45bcb4',
          500: '#299f98',
          600: '#1f7f7a',
          700: '#1e6560',
          800: '#1c514e',
          900: '#1a4442',
        },
        secondary: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#bfe4fe',
          300: '#93d3fd',
          400: '#5fb9fa',
          500: '#3a9df3',
          600: '#237fe0',
          700: '#1c65bd',
          800: '#1c5399',
          900: '#1c477a',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: { 50: '#f0fdf4', 500: '#22c55e', 600: '#16a34a', 700: '#15803d' },
        warning: { 50: '#fffbeb', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
        danger: { 50: '#fef2f2', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c' },
        rating: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.06)',
        cardHover: '0 8px 24px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};