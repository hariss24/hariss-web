/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#0B0F19",
        accent: "#F59E0B",
        text: "rgb(203, 213, 225)",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      }
    },
  },
  plugins: [],
}
