/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFDF7', 
        secondary: '#FFF9C4',
        tertiary: '#E0F7FA',
        border: '#1E1210',
        textPrimary: '#2D2321',
        textSecondary: '#4A3A37',
        textMuted: '#6B5B58',
        accent: '#EF476F',
        warning: '#FFD166',
        success: '#06D6A0',
        info: '#45B3E0',
      },
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
        quicksand: ['"Quicksand"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neo': '4px 4px 0px #1E1210',
        'neo-lg': '6px 6px 0px #1E1210',
        'neo-xl': '8px 8px 0px #1E1210',
        'soft': '0 18px 40px rgba(43, 29, 27, 0.22)',
      }
    },
  },
  plugins: [],
}
