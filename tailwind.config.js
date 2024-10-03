/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'w290':'290px',
      'w400': '400px',
      'sm': '640px',

      'md': '768px',

      'w800': '800px',
      'w1000':'1000px',
      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    },
  },
  plugins: [],
}

