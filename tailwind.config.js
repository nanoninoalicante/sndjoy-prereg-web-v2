/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      grey: colors.gray,
      blue: colors.blue,
      lime: colors.lime,
      emerald: colors.emerald,
      red: colors.red,
      orange: colors.orange,
      indigo: colors.indigo,
      fuchsia: colors.fuchsia,
      yellow: colors.yellow,
      teal: colors.teal,
      twitter: "#1DA1F2",
      primary: {
        500: "#e87c5f",
        700: "#934f3c",
      },
      warning: {
        200: "#FFAE71",
        500: "#FF6D00",
      },
    },
  }
}
