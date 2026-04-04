import React from "react";

export type BadgeVariant = "success" | "error" | "warning" | "info" | "neutral";

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children?: React.ReactNode;
}

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  success: "matchdb-badge-success",
  error: "matchdb-badge-error",
  warning: "matchdb-badge-warning",
  info: "matchdb-badge-info",
  neutral: "",
};

export default function StatusBadge({
  variant = "neutral",
  className,
  children,
  ...rest
}: StatusBadgeProps) {
  const cls = [VARIANT_CLASS[variant], className].filter(Boolean).join(" ");
  return (
    <span className={cls || undefined} {...rest}>
      {children}
    </span>
  );
}
