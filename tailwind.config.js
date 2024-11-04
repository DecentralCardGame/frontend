/* eslint-env node */
/** @type {import('tailwindcss').Config} */

const pxToRem = (dest) => 1 / (16 / dest);

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@ignt/vue-library/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cc-red": "#D82027",
        "cc-yellow": "#FEC560",
        "pussy-red": "#8F6173",
      },
      fontFamily: {
        sans: ["Roboto", "roboto"],
      },
      dropShadow: {
        glowRed: ["0px 0px 24px rgba(216, 32, 39, 0.90)"],
        header: ["8px 8px 3px rgba(0, 0, 0, 0.25)"],
        glowTeal: ["0px 0px 24px #40C1C7"],
        glowCCYellow: ["0px 0px 24px #FEC560"],
        glowCCRed: ["0px 0px 24px rgba(216, 32, 39, 0.90)"],
        glowCCBlue: ["0px 0px 24px rgba(39, 32, 216, 0.90)"],
        glowCCGreen: ["0px 0px 24px rgba(32, 216, 39, 0.90)"],
        glowCCPurple: ["0px 0px 24px rgba(216, 32, 216, 0.90)"],
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss"), require("@tailwindcss/forms")],
};
