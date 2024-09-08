/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "primary": ['"Poppins"', "sans-serif"],
        "title": ['"Playfair Display"', "serif"]
      },
      colors: {
        "primary": "#00D386"
      }
    },
  },
  plugins: [],
}

