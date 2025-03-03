/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        mainColor: "var(--main-color)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
