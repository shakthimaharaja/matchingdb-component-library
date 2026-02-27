/**
 * FilterBar — Slim Win97-styled row for filters/labels/inputs.
 */
import React from "react";

export interface FilterBarProps {
  children: React.ReactNode;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ children, className }) => {
  const cls = ["matchdb-filter-bar", className].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
};

export default FilterBar;
