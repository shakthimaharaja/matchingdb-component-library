const matchdbPreset = require("./tailwind.preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [matchdbPreset],
  content: ["./src/**/*.{ts,tsx}"],
  important: false,
};
