import React from "react";

export type KpiSize = "sm" | "md" | "lg";
export type KpiValueColor =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "teal"
  | "navy"
  | "muted";

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: string;
  /** "sm" = 14px, "md" = 20px (default), "lg" = 28px */
  size?: KpiSize;
  /** Semantic color for the value */
  valueColor?: KpiValueColor;
}

const VALUE_CLASS: Record<KpiSize, string> = {
  sm: "u-fs-14 u-fw-700",
  md: "matchdb-kpi-value",
  lg: "matchdb-kpi-value-lg",
};
const LABEL_CLASS: Record<KpiSize, string> = {
  sm: "matchdb-kpi-label",
  md: "matchdb-kpi-label",
  lg: "matchdb-kpi-label-lg",
};

const VALUE_COLOR_CLASS: Record<KpiValueColor, string> = {
  default: "",
  success: "matchdb-kpi-value-success",
  error: "matchdb-kpi-value-error",
  warning: "matchdb-kpi-value-warning",
  teal: "matchdb-kpi-value-teal",
  navy: "matchdb-kpi-value-navy",
  muted: "matchdb-kpi-value-muted",
};

export default function KpiCard({
  value,
  label,
  size = "md",
  valueColor = "default",
  className,
  ...rest
}: KpiCardProps) {
  return (
    <div className={className} {...rest}>
      <div
        className={[VALUE_CLASS[size], VALUE_COLOR_CLASS[valueColor]]
          .filter(Boolean)
          .join(" ")}
      >
        {value}
      </div>
      <div className={LABEL_CLASS[size]}>{label}</div>
    </div>
  );
}
