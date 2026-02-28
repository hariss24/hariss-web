/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk}", "./src/assets/js/**/*.js", "./*.html"],
  theme: {
    extend: {
      colors: {
        pitch: "#030303",
        accent: "#E25D1E",
        offwhite: "#F3F4F6",
        surface: "#111111",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
