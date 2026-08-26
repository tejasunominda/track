/**
 * Single source of truth for design tokens (Frontend Specification Document §2).
 * Consumed by tailwind.config.ts so Tailwind utility classes and any
 * runtime-themed components stay perfectly in sync.
 */
export const tokens = {
  colors: {
    gray: {
      50: "#FAFBFC",
      100: "#F4F5F7",
      200: "#E5E7EB",
      300: "#C1C7D0",
      400: "#A5ADBA",
      500: "#7A869A",
      600: "#5E6C84",
      700: "#42526E",
      800: "#253858",
      900: "#172B4D",
    },
    primary: {
      DEFAULT: "#0052CC",
      hover: "#0747A6",
      light: "#DEEBFF",
    },
    success: "#36B37E",
    warning: "#FFAB00",
    danger: "#DE350B",
    info: "#0052CC",
    priority: {
      highest: "#DE350B",
      high: "#FF7452",
      medium: "#FFAB00",
      low: "#6B778C",
      lowest: "#97A0AF",
    },
    statusCategory: {
      todo: "#42526E",
      inProgress: "#0052CC",
      done: "#36B37E",
    },
  },
  spacing: {
    px1: "4px",
    px2: "8px",
    px3: "12px",
    px4: "16px",
    px6: "24px",
    px8: "32px",
    px12: "48px",
  },
  fontFamily: {
    sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"],
  },
  fontSize: {
    caption: "12px",
    dense: "13px",
    body: "14px",
    section: "16px",
    title: "20px",
    dashboard: "24px",
  },
} as const;
