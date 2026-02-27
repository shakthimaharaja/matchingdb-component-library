/**
 * TypePill — Win97-styled type/status badge.
 *
 * Renders as a small inline-block pill. Accepts an optional
 * `status` variant for vendor job posting statuses.
 */
import React from "react";

export type PillStatus = "active" | "closed" | undefined;

export interface TypePillProps {
  /** Text content */
  children: React.ReactNode;
  /** Optional status variant that adds colour decoration */
  status?: PillStatus;
  /** Extra class names */
  className?: string;
  style?: React.CSSProperties;
}

const statusClass: Record<string, string> = {
  active: "vdp-status-active",
  closed: "vdp-status-closed",
};

const TypePill: React.FC<TypePillProps> = ({
  children,
  status,
  className,
  style,
}) => {
  const cls = [
    "matchdb-type-pill",
    status ? statusClass[status] : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={cls} style={style}>
      {children}
    </span>
  );
};

export default TypePill;
