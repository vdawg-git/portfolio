const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.svelte", "**.html"],
  theme: {
    fontFamily: {
      sans: ["IBMPlexSans", "ui-sans"],
    },

    extend: {
      colors: { white: colors.zinc[200] },
      fontSize: { "2xs": "0.625rem" },
    },
  },
}
