/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  prefix: 'tw-',
  content: [
      "./*.html",
      "./projects/**/*.html",
      "./index.js",
      "./scripts/**/*.js"
  ],
  theme: {
      extend: {},
  },
  plugins: [],
};