/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { addDynamicIconSelectors } from "@iconify/tailwind";

const TAILWIND_PLUGINS = [
  require("@tailwindcss/aspect-ratio"),
  require("@tailwindcss/forms"),
  require("@tailwindcss/typography"),
];

const CUSTOM_PLUGINS = [addDynamicIconSelectors()];

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
    "./projects/**/*.{html,ts}",
    "node_modules/preline/dist/*.js",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      body: ["Poppins", "sans-serif"],
    },
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {},
  },
  plugins: [...TAILWIND_PLUGINS, ...CUSTOM_PLUGINS, require("preline/plugin")],
};
