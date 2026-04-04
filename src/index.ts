/**
 * matchdb-component-library — barrel export
 *
 * Usage:
 *   import { DataTable, Button, TypePill, fmtCurrency } from "matchdb-component-library";
 *   import "matchdb-component-library/src/styles/w97-theme.css";
 *   import "matchdb-component-library/src/styles/w97-base.css";
 *   import "matchdb-component-library/src/styles/components.css";
 *   import "matchdb-component-library/src/styles/modern-theme.css";
 */

// ── Styles (importable CSS) ─────────────────────────────────────────────────
// Consumers import these directly:
//   import "matchdb-component-library/src/styles/w97-theme.css";
//   import "matchdb-component-library/src/styles/w97-base.css";
//   import "matchdb-component-library/src/styles/components.css";
//   import "matchdb-component-library/src/styles/modern-theme.css";

// ── Atomic Components ───────────────────────────────────────────────────────
export { default as Button } from "./components/Button/Button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from "./components/Button/Button";

export { default as Input } from "./components/Input/Input";
export type {
  InputProps,
  InputSize,
  InputVariant,
} from "./components/Input/Input";

export { default as Select } from "./components/Input/Select";
export type {
  SelectProps,
  SelectSize,
  SelectVariant,
} from "./components/Input/Select";

export { default as TypePill } from "./components/Badge/TypePill";
export type { TypePillProps, PillStatus } from "./components/Badge/TypePill";

export { default as Alert } from "./components/Alert/Alert";
export type { AlertProps, AlertVariant } from "./components/Alert/Alert";

export { default as Shimmer } from "./components/Shimmer/Shimmer";
export type { ShimmerProps, ShimmerSize } from "./components/Shimmer/Shimmer";

export { default as MatchMeter } from "./components/MatchMeter/MatchMeter";
export type {
  MatchMeterProps,
  MeterVariant,
} from "./components/MatchMeter/MatchMeter";

// ── New Layout / Typography Components ──────────────────────────────────────
export { default as Text } from "./components/Text/Text";
export type {
  TextProps,
  TextSize,
  TextWeight,
  TextColor,
  TextTransform,
  TextAs,
} from "./components/Text/Text";

export { default as Stack } from "./components/Stack/Stack";
export type {
  StackProps,
  StackDirection,
  StackAlign,
  StackGap,
  StackPad,
} from "./components/Stack/Stack";

export { default as StatusBadge } from "./components/Badge/StatusBadge";
export type {
  StatusBadgeProps,
  BadgeVariant,
} from "./components/Badge/StatusBadge";

export { default as FormField } from "./components/FormField/FormField";
export type { FormFieldProps } from "./components/FormField/FormField";

export { default as KpiCard } from "./components/KpiCard/KpiCard";
export type {
  KpiCardProps,
  KpiSize,
  KpiValueColor,
} from "./components/KpiCard/KpiCard";

export { default as EmptyState } from "./components/EmptyState/EmptyState";
export type {
  EmptyStateProps,
  EmptyVariant,
} from "./components/EmptyState/EmptyState";

export { default as ProgressBar } from "./components/ProgressBar/ProgressBar";
export type {
  ProgressBarProps,
  ProgressVariant,
  ProgressSize,
} from "./components/ProgressBar/ProgressBar";

// ── Compound Components ─────────────────────────────────────────────────────
export { default as DataTable } from "./components/DataTable/DataTable";
export type {
  DataTableProps,
  DataTableColumn,
  DataTableVariant,
} from "./components/DataTable/DataTable";

export { default as Toolbar } from "./components/Toolbar/Toolbar";
export type { ToolbarProps } from "./components/Toolbar/Toolbar";

export { default as Tabs } from "./components/Tabs/Tabs";
export type { TabsProps, Tab } from "./components/Tabs/Tabs";

export { default as FilterBar } from "./components/FilterBar/FilterBar";
export type { FilterBarProps } from "./components/FilterBar/FilterBar";

export { default as StatBar } from "./components/StatBar/StatBar";
export type { StatBarProps, StatItem } from "./components/StatBar/StatBar";

export { default as Panel } from "./components/Panel/Panel";
export type { PanelProps } from "./components/Panel/Panel";

export {
  default as Footnote,
  FootnoteSep,
} from "./components/Footnote/Footnote";
export type { FootnoteProps } from "./components/Footnote/Footnote";

// ── Utilities ───────────────────────────────────────────────────────────────
export {
  fmtCurrency,
  fmtDate,
  fmtList,
  fmtVal,
  formatExperience,
  TYPE_LABELS,
  SUB_LABELS,
  authHeader,
  downloadBlob,
} from "./utils";

// ── Icons ───────────────────────────────────────────────────────────────────
export { ICONS, PI } from "./icons";

// ── Theme System ────────────────────────────────────────────────────────────
export { ThemeProvider, useTheme } from "./theme";
export type {
  ThemeMode,
  ColorScheme,
  TextSize as ThemeTextSize,
  ThemePreferences,
  ThemeContextValue,
  ThemeProviderProps,
} from "./theme";

// ── Settings Components ─────────────────────────────────────────────────────
export { default as ThemeSwitcher } from "./components/Settings/ThemeSwitcher";
export type { ThemeSwitcherProps } from "./components/Settings/ThemeSwitcher";

export { default as TextSizeControl } from "./components/Settings/TextSizeControl";
export type { TextSizeControlProps } from "./components/Settings/TextSizeControl";

export { default as ColorSchemeToggle } from "./components/Settings/ColorSchemeToggle";
export type { ColorSchemeToggleProps } from "./components/Settings/ColorSchemeToggle";

export { default as AppearanceSettings } from "./components/Settings/AppearanceSettings";
export type { AppearanceSettingsProps } from "./components/Settings/AppearanceSettings";
