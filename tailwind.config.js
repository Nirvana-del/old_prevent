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
      'sky-400': 'rgb(56 189 248)',
      'teal-400': 'rgb(45 212 191)',
      'teal-100': 'rgb(204 251 241)',
      'slate-50': 'rgb(248 250 252)',
      'slate-300': 'rgb(203 213 225)',
      'white': '#ffffff',
      'gray': '#00000073',
      'purple': '#3f3cbb',
      'orange': '#FF5000',
      'red': '#E71F19',
      'midnight': '#121063',
      'metal': '#565584',
      'blue': '#3b82f6',
      'light-blue': '#38bdf8',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
    },
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)', },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [
  ],
}
