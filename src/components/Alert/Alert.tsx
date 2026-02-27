/**
 * Alert — Win97-styled inline alert (success / error).
 */
import React from "react";

export type AlertVariant = "success" | "error";

export interface AlertProps {
  variant: AlertVariant;
  children: React.ReactNode;
  className?: string;
}

const icons: Record<AlertVariant, string> = {
  success: "✓",
  error: "✕",
};

const Alert: React.FC<AlertProps> = ({ variant, children, className }) => {
  const cls = ["matchdb-alert", `matchdb-alert-${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} role="alert">
      <span>{icons[variant]}</span> {children}
    </div>
  );
};

export default Alert;
