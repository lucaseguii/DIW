/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors:{
        'main': "#d2eef5",
        'div': "#e0f7fa",
        'borderdiv': "#FFFEFE",
      },
    },
  },
  plugins: [],
}
