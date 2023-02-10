const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.svelte", "**.html"],
  theme: {
    fontFamily: {
      serif: ["Inter", "ui-serif", "Georgia", "Cambria", "Times, serif"],
    },

    extend: {
      fontSize: { "2xs": "0.625rem" },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        md: "0 4px 8px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
        cover: `
        0 0px 8px var(--tw-shadow-color),
        0 0px 16px var(--tw-shadow-color), 
        0 0px 24px var(--tw-shadow-color)`,
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      )
    }),
  ],
}
