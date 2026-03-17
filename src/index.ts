/**
 * matchdb-component-library — barrel export
 *
 * Usage:
 *   import { DataTable, Button, TypePill, fmtCurrency } from "matchdb-component-library";
 *   import "matchdb-component-library/src/styles/w97-theme.css";
 *   import "matchdb-component-library/src/styles/w97-base.css";
 *   import "matchdb-component-library/src/styles/components.css";
 */

// ── Styles (importable CSS) ─────────────────────────────────────────────────
// Consumers import these directly:
//   import "matchdb-component-library/src/styles/w97-theme.css";
//   import "matchdb-component-library/src/styles/w97-base.css";
//   import "matchdb-component-library/src/styles/components.css";

// ── Atomic Components ───────────────────────────────────────────────────────
export { default as Button } from "./components/Button/Button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from "./components/Button/Button";

export { default as Input } from "./components/Input/Input";
export type { InputProps } from "./components/Input/Input";

export { default as Select } from "./components/Input/Select";
export type { SelectProps } from "./components/Input/Select";

export { default as TypePill } from "./components/Badge/TypePill";
export type { TypePillProps, PillStatus } from "./components/Badge/TypePill";

export { default as Alert } from "./components/Alert/Alert";
export type { AlertProps, AlertVariant } from "./components/Alert/Alert";

export { default as Shimmer } from "./components/Shimmer/Shimmer";
export type { ShimmerProps } from "./components/Shimmer/Shimmer";

export { default as MatchMeter } from "./components/MatchMeter/MatchMeter";
export type {
  MatchMeterProps,
  MeterVariant,
} from "./components/MatchMeter/MatchMeter";

// ── Compound Components ─────────────────────────────────────────────────────
export { default as DataTable } from "./components/DataTable/DataTable";
export type {
  DataTableProps,
  DataTableColumn,
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
