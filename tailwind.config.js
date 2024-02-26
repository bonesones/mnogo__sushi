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
        '128': "32rem",
        '140': "35rem",
        '160': "40rem",
        '168': "42rem"
      },
      width: {
        '120': '30rem',
        '152': '38rem',
        '232': '58rem'
      }
    },
  },
  plugins: [],
}

