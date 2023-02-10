/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.svelte", "**.html"],
  theme: {
    fontFamily: {
      serif: ["Inter", "ui-serif", "Georgia", "Cambria", "Times, serif"],
    },

    extend: {
      fontSize: { "2xs": "0.625rem" },
    },
  },
  plugins: [],
}
