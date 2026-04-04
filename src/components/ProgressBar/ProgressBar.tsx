import React from "react";

export type ProgressVariant = "default" | "success" | "warning" | "error";
export type ProgressSize = "thin" | "default" | "thick";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Percentage 0-100 */
  value: number;
  variant?: ProgressVariant;
  /** Height preset: thin (4px) | default (6px) | thick (10px) */
  size?: ProgressSize;
}

const FILL_CLASS: Record<ProgressVariant, string> = {
  default: "matchdb-progress-fill matchdb-progress-fill-default",
  success: "matchdb-progress-fill matchdb-progress-fill-success",
  warning: "matchdb-progress-fill matchdb-progress-fill-warning",
  error: "matchdb-progress-fill matchdb-progress-fill-error",
};

const SIZE_CLASS: Record<ProgressSize, string> = {
  thin: "matchdb-progress-thin",
  default: "",
  thick: "matchdb-progress-thick",
};

export default function ProgressBar({
  value,
  variant = "default",
  size = "default",
  className,
  ...rest
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  const trackCls = ["matchdb-progress-track", SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={trackCls} {...rest}>
      <div className={FILL_CLASS[variant]} style={{ width: `${pct}%` }} />
    </div>
  );
}
