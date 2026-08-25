import type { Config } from "tailwindcss";

// Design tokens (colors, spacing, type scale) are sourced from src/styles/tokens.ts
// per Frontend Specification Document §2 / §8, so Tailwind and runtime theming
// stay in sync from a single source of truth.
import { tokens } from "./src/styles/tokens";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      fontFamily: tokens.fontFamily,
      fontSize: tokens.fontSize,
    },
  },
  plugins: [],
} satisfies Config;
