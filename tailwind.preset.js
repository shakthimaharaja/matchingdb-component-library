/**
 * matchdb-component-library — Shared Tailwind CSS Preset
 *
 * This preset maps MatchDB CSS custom-properties to Tailwind tokens so that
 * every consuming app (shell-ui, jobs-ui) and the component library itself
 * shares the same design-token namespace.
 *
 * Usage in consumer tailwind.config.js:
 *   const matchdbPreset = require("matchdb-component-library/tailwind.preset");
 *   module.exports = { presets: [matchdbPreset], ... };
 *
 * Utility examples:
 *   bg-w97-window   →  background: var(--w97-window)
 *   text-m-primary  →  color: var(--m-primary)
 *   border-w97-border-light → border-color: var(--w97-border-light)
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      /* ── W97 (legacy / default) design tokens ───────────────────────── */
      colors: {
        w97: {
          desktop: "var(--w97-desktop)",
          window: "var(--w97-window)",
          "window-alt": "var(--w97-window-alt)",
          "titlebar-from": "var(--w97-titlebar-from)",
          "titlebar-to": "var(--w97-titlebar-to)",
          "titlebar-text": "var(--w97-titlebar-text)",
          text: "var(--w97-text)",
          "text-secondary": "var(--w97-text-secondary)",
          "text-muted": "var(--w97-text-muted)",
          "text-placeholder": "var(--w97-text-placeholder)",
          "btn-face": "var(--w97-btn-face)",
          "btn-highlight": "var(--w97-btn-highlight)",
          "btn-shadow": "var(--w97-btn-shadow)",
          "btn-dark": "var(--w97-btn-dark)",
          "input-bg": "var(--w97-input-bg)",
          "input-border": "var(--w97-input-border)",
          "border-light": "var(--w97-border-light)",
          "border-dark": "var(--w97-border-dark)",
          "sidebar-bg": "var(--w97-sidebar-bg)",
          "sidebar-active": "var(--w97-sidebar-active)",
          "sidebar-active-text": "var(--w97-sidebar-active-text)",
          "nav-hover": "var(--w97-nav-hover)",
          "nav-text": "var(--w97-nav-text)",
          "content-bg": "var(--w97-content-bg)",
          "breadcrumb-bg": "var(--w97-breadcrumb-bg)",
          "footer-bg": "var(--w97-footer-bg)",
          red: "var(--w97-red)",
          orange: "var(--w97-orange)",
          green: "var(--w97-green)",
          blue: "var(--w97-blue)",
          yellow: "var(--w97-yellow)",
          teal: "var(--w97-teal)",
          navy: "var(--w97-navy)",
          sky: "var(--w97-sky)",
          link: "var(--w97-link)",
          "link-alt": "var(--w97-link-alt)",
          error: "var(--w97-error)",
          "error-light": "var(--w97-error-light)",
          success: "var(--w97-success)",
          "success-bg": "var(--w97-success-bg)",
          "error-bg": "var(--w97-error-bg)",
          surface: "var(--w97-surface)",
          "surface-alt": "var(--w97-surface-alt)",
          "zebra-odd": "var(--w97-zebra-odd)",
          "stripe-dark": "var(--w97-stripe-dark)",
          "section-heading": "var(--w97-section-heading)",
          "info-label": "var(--w97-info-label)",
        },

        /* ── Modern (SaaS) design tokens ──────────────────────────────── */
        m: {
          primary: "var(--m-primary)",
          "primary-hover": "var(--m-primary-hover)",
          "primary-light": "var(--m-primary-light)",
          accent: "var(--m-accent)",
          "accent-hover": "var(--m-accent-hover)",
          success: "var(--m-success)",
          "success-light": "var(--m-success-light)",
          warning: "var(--m-warning)",
          "warning-light": "var(--m-warning-light)",
          danger: "var(--m-danger)",
          "danger-light": "var(--m-danger-light)",
          info: "var(--m-info)",
          "info-light": "var(--m-info-light)",
          bg: "var(--m-bg)",
          card: "var(--m-card)",
          "card-hover": "var(--m-card-hover)",
          surface: "var(--m-surface)",
          text: "var(--m-text)",
          "text-secondary": "var(--m-text-secondary)",
          "text-muted": "var(--m-text-muted)",
          "text-inverse": "var(--m-text-inverse)",
          border: "var(--m-border)",
          "border-strong": "var(--m-border-strong)",
          divider: "var(--m-divider)",
          "input-bg": "var(--m-input-bg)",
          "input-border": "var(--m-input-border)",
          "sidebar-bg": "var(--m-sidebar-bg)",
          "sidebar-text": "var(--m-sidebar-text)",
          "sidebar-hover": "var(--m-sidebar-hover)",
          "sidebar-active-bg": "var(--m-sidebar-active-bg)",
          "sidebar-active-text": "var(--m-sidebar-active-text)",
          "header-bg": "var(--m-header-bg)",
        },
      },

      /* ── Box shadows from modern tokens ─────────────────────────────── */
      boxShadow: {
        "m-xs": "var(--m-shadow-xs)",
        "m-sm": "var(--m-shadow-sm)",
        "m-md": "var(--m-shadow-md)",
        "m-lg": "var(--m-shadow-lg)",
      },

      /* ── Border radii from modern tokens ────────────────────────────── */
      borderRadius: {
        "m-xs": "var(--m-radius-xs)",
        "m-sm": "var(--m-radius-sm)",
        m: "var(--m-radius)",
        "m-lg": "var(--m-radius-lg)",
        "m-xl": "var(--m-radius-xl)",
      },

      /* ── Font family ────────────────────────────────────────────────── */
      fontFamily: {
        "m-sans": "var(--m-font-sans)",
      },

      /* ── Font size scaled via CSS variable ──────────────────────────── */
      fontSize: {
        scaled: ["calc(1em * var(--fs-scale, 1))", { lineHeight: "1.4" }],
      },
    },
  },

  corePlugins: {
    preflight: false, // Don't conflict with PrimeReact / MUI resets
  },

  plugins: [],
};
