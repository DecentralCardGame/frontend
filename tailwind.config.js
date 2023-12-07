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
    extend: {}
  },
  plugins: [require("@headlessui/tailwindcss"),
            require('@tailwindcss/forms')
  ],
};
