/**
 * matchdb-component-library — ThemeContext
 *
 * Provides theme mode, color scheme, and text-size state to the whole app.
 * Applies data attributes on <html> so CSS in modern-theme.css kicks in.
 *
 * Usage (wrap your app once):
 *   import { ThemeProvider } from "matchdb-component-library";
 *   <ThemeProvider>…</ThemeProvider>
 *
 * Consumers:
 *   import { useTheme } from "matchdb-component-library";
 *   const { themeMode, setThemeMode, colorScheme, textSize } = useTheme();
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ── Types ────────────────────────────────────────────────────────────────────

/** Visual theme mode: "legacy" = W97 look, "classic" = AWS look, "modern" = SaaS theme. */
export type ThemeMode = "legacy" | "classic" | "modern";

/** Light / dark colour scheme, or "auto" to follow OS preference. */
export type ColorScheme = "light" | "dark" | "auto";

/** Font-size preset. "medium" is the default (14 px). */
export type TextSize = "small" | "medium" | "large";

export interface ThemePreferences {
  themeMode: ThemeMode;
  colorScheme: ColorScheme;
  textSize: TextSize;
}

export interface ThemeContextValue extends ThemePreferences {
  /** Resolved effective scheme (never "auto") */
  resolvedScheme: "light" | "dark";
  setThemeMode: (m: ThemeMode) => void;
  setColorScheme: (s: ColorScheme) => void;
  setTextSize: (s: TextSize) => void;
  /** Replace all prefs at once (e.g. after loading from API) */
  setAll: (prefs: ThemePreferences) => void;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = "matchdb_theme_prefs";

const defaultPrefs: ThemePreferences = {
  themeMode: "legacy",
  colorScheme: "light",
  textSize: "medium",
};

function loadPrefs(): ThemePreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw) as Partial<ThemePreferences>;
    return {
      themeMode:
        parsed.themeMode === "modern" || parsed.themeMode === "classic"
          ? parsed.themeMode
          : "legacy",
      colorScheme:
        parsed.colorScheme === "dark" || parsed.colorScheme === "auto"
          ? parsed.colorScheme
          : "light",
      textSize:
        parsed.textSize === "small" || parsed.textSize === "large"
          ? parsed.textSize
          : "medium",
    };
  } catch {
    return defaultPrefs;
  }
}

function savePrefs(p: ThemePreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* quota exceeded — ignore */
  }
}

// ── OS media query helper ────────────────────────────────────────────────────

function getOSColorScheme(): "light" | "dark" {
  if (globalThis.window === undefined) return "light";
  return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// ── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Called whenever prefs change (debounced by the consumer for API sync). */
  onPrefsChange?: (prefs: ThemePreferences) => void;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  onPrefsChange,
}) => {
  const [prefs, setPrefs] = useState<ThemePreferences>(loadPrefs);
  const [osScheme, setOsScheme] = useState<"light" | "dark">(getOSColorScheme);
  const onPrefsChangeRef = useRef(onPrefsChange);
  onPrefsChangeRef.current = onPrefsChange;

  // Listen for OS dark mode changes
  useEffect(() => {
    const mql = globalThis.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mql) return;
    const handler = (e: MediaQueryListEvent) =>
      setOsScheme(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Resolved scheme
  const resolvedScheme: "light" | "dark" =
    prefs.colorScheme === "auto" ? osScheme : prefs.colorScheme;

  // Font-size CSS variable map
  const fontPxMap: Record<string, string> = {
    small: "11px",
    medium: "13px",
    large: "15px",
  };

  // Apply data attributes on <html> + <body>
  useEffect(() => {
    const el = document.documentElement;
    const body = document.body;

    // Theme mode data attributes
    if (prefs.themeMode === "modern") {
      el.dataset.theme = "modern";
      delete body.dataset.style;
    } else if (prefs.themeMode === "classic") {
      delete el.dataset.theme;
      body.dataset.style = "modern"; // activates aws-theme.css
    } else {
      delete el.dataset.theme;
      delete body.dataset.style;
    }

    // SaaS data-theme on .legacy-shell-root
    const shellRoot = document.querySelector(".legacy-shell-root");
    if (shellRoot instanceof HTMLElement) {
      if (prefs.themeMode === "modern") {
        shellRoot.dataset.theme = "modern2";
      } else {
        delete shellRoot.dataset.theme;
      }
    }

    // Color scheme on body (for MFE CSS) + html
    el.dataset.colorScheme = resolvedScheme;
    body.dataset.theme = resolvedScheme === "dark" ? "dark" : "light";

    // Font size
    el.dataset.fontSize = prefs.textSize;
    el.style.setProperty(
      "--w97-font-base",
      fontPxMap[prefs.textSize] || "13px",
    );
  }, [prefs.themeMode, resolvedScheme, prefs.textSize]);

  // Persist + notify
  useEffect(() => {
    savePrefs(prefs);
    onPrefsChangeRef.current?.(prefs);
  }, [prefs]);

  const setThemeMode = useCallback(
    (m: ThemeMode) => setPrefs((p) => ({ ...p, themeMode: m })),
    [],
  );
  const setColorScheme = useCallback(
    (s: ColorScheme) => setPrefs((p) => ({ ...p, colorScheme: s })),
    [],
  );
  const setTextSize = useCallback(
    (s: TextSize) => setPrefs((p) => ({ ...p, textSize: s })),
    [],
  );
  const setAll = useCallback((p: ThemePreferences) => setPrefs(p), []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      ...prefs,
      resolvedScheme,
      setThemeMode,
      setColorScheme,
      setTextSize,
      setAll,
    }),
    [prefs, resolvedScheme, setThemeMode, setColorScheme, setTextSize, setAll],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
