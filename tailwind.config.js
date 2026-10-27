/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A352B',
        brown: {
          DEFAULT: '#4A352B',
          light: '#64493B',
          dark: '#37261E',
        },
        'off-white': '#F7F4EF',
        ivory: '#F7F4EF',
        charcoal: '#242321',
        accent: '#C7B8A5',
        stone: '#C7B8A5',
        taupe: '#DED6CC',
        border: '#DED6CC',
        muted: '#77716B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Garamond', 'Georgia', 'serif'],
      },
      maxWidth: {
        editorial: '1126px',
      },
    },
  },
  plugins: [],
}

