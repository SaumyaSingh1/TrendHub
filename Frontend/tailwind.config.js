/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        customColor:{
          DEFAULT:'#5a4948',
        hover:'#282120'}
      }
    },
  },
  plugins: [],
}

