/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#1e3a5f',
          600: '#172e4c',
          700: '#10223a',
          accent: '#2563eb',
        }
      }
    },
  },
  plugins: [],
}
