/** @type {import('tailwindcss').Config} */

// const newColors = {
//     custom: {
//         grey: "#6B6E70",
//         grey2: "#474B4F",
//         dark: "#222629",
//         green: "#86C232",
//         green2: "#61892F"
//     },
// }


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],


  theme: {
    extend: {
      colors: {
        grey: "#6B6E70",
        grey2: "#474B4F",
        dark: "#222629",
        dark2:"#1E1E1E",
        green1: "#86C232",
        green2: "#61892F",
        
      }
    },
  },
  plugins: [],
}