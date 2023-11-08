/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    // app content
    "src/**/*.{js,ts,jsx,tsx}",
    // include packages if not transpiling
    "packages/**/**/*.{js,ts,jsx,tsx}",
    "packages/**/*.{js,ts,jsx,tsx}",
    "../../packages/kylo-dom/src/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [],
};
