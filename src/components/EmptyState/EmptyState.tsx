import React from "react";

export type EmptyVariant = "empty" | "gate" | "loading" | "error";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: EmptyVariant;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

const ROOT_CLASS: Record<EmptyVariant, string> = {
  empty: "matchdb-empty-state",
  gate: "matchdb-gate",
  loading: "matchdb-loading-center",
  error: "matchdb-empty-state",
};

export default function EmptyState({
  variant = "empty",
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  const cls = [ROOT_CLASS[variant], className].filter(Boolean).join(" ");

  if (variant === "loading") {
    return (
      <div className={cls} {...rest}>
        {rest.children}
      </div>
    );
  }

  return (
    <div className={cls} {...rest}>
      {icon && (
        <div
          className={
            variant === "gate" ? "matchdb-gate-icon" : "matchdb-empty-icon"
          }
        >
          {icon}
        </div>
      )}
      {title && (
        <h2
          className={
            variant === "gate" ? "matchdb-gate-title" : "matchdb-empty-title"
          }
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          className={
            variant === "gate" ? "matchdb-gate-desc" : "matchdb-empty-desc"
          }
        >
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
