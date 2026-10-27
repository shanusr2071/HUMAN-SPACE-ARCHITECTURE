/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: '#8c5e3c',
          light: '#a2714c',
          dark: '#6e472c',
        },
        'off-white': '#f7f5f2',
        charcoal: '#2e2e2e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        editorial: '1126px',
      },
    },
  },
  plugins: [],
}
