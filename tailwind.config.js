/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Elite Design System - Dark Mode
        'elite': {
          'bg': '#0a0a0a',      // Deep charcoal/black primary background
          'surface': '#141414',  // Slightly lighter surface
          'border': '#2a2a2a',   // Thin light gray borders (architectural style)
          'text': {
            'primary': '#ffffff',
            'secondary': '#a0a0a0',
            'muted': '#6b6b6b',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

