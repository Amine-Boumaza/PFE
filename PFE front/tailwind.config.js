/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        c1: "#1a6271",
        hover: "#3addff",
      },

      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [],
};
