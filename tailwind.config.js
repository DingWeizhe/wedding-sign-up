const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xs: "391px",
        sm: "460px",
        "xs-h": { raw: "(min-height: 750px)" },
      },
      colors: {
        red: "#9E3025",
        green: "#A6C5A8",
        line: "#76C26E",
      },
    },
  },
  variants: [],
  plugins: [
    plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
      addUtilities({
        ".text-shadow-light": {
          "text-shadow": "0px 0px 10px #ffffff",
        },
        ".writing-mode-horizontal": {
          "writing-mode": "horizontal-tb",
        },
        ".text-shadow": {
          "writing-mode": "horizontal-tb",
        },
        ".writing-mode-vertical": {
          "writing-mode": "vertical-rl",
        },
        ".writing-mode-vertical-lr": {
          "writing-mode": "vertical-lr",
        },
      });
    }),
  ],
};
