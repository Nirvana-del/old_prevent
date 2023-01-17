/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  variants: {
    extend: {
    }
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'blue': '#3b82f6',
      'light-blue': '#38bdf8',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    extend: {},
  },
  plugins: [
  ],
}
