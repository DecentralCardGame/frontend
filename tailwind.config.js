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
      fontFamily: {
        sans: [
          'Roboto',
          'roboto',
          ],
      },
      dropShadow: {
        glow: [
          "0px 0px 24px rgba(216, 32, 39, 0.90)",
        ]
      }

    }
  },
  plugins: [require("@headlessui/tailwindcss")],
};
