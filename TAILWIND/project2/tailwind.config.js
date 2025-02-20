/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary": "#7FBEAB",
        "secondary": "#FB62F6",
      },
      spacing: {
        0.75: "6px",
      }
    },
  },
  plugins: [],
}
