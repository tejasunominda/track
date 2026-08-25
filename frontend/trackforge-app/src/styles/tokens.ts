/**
 * Single source of truth for design tokens (Frontend Specification Document §2).
 * Consumed by tailwind.config.ts so Tailwind utility classes and any
 * runtime-themed components stay perfectly in sync.
 */
export const tokens = {
  colors: {
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    primary: {
      DEFAULT: "#4338ca",
      hover: "#3730a3",
    },
    success: "#16a34a",
    warning: "#d97706",
    danger: "#dc2626",
    info: "#2563eb",
    priority: {
      highest: "#dc2626",
      high: "#ea580c",
      medium: "#ca8a04",
      low: "#64748b",
      lowest: "#94a3b8",
    },
    statusCategory: {
      todo: "#6b7280",
      inProgress: "#2563eb",
      done: "#16a34a",
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
    sans: ["Inter", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
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
