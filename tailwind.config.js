/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.jsx",
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      height: {
        '160': "40rem"
      }
    },
  },
  plugins: [],
}

