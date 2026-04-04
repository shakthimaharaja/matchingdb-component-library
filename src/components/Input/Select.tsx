/**
 * Select — Win97-styled dropdown select.
 *
 * Sizes:     xs | sm | md (default)
 * Variants:  default | toolbar | detail | finance
 * fullWidth: stretches to 100% of parent
 */
import React from "react";

export type SelectSize = "xs" | "sm" | "md";
export type SelectVariant = "default" | "toolbar" | "detail" | "finance";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Size variant */
  size?: SelectSize;
  /** Visual variant */
  variant?: SelectVariant;
  /** Stretch to full width of parent */
  fullWidth?: boolean;
  /** Child <option> elements */
  children: React.ReactNode;
}

const SIZE_CLASS: Record<SelectSize, string> = {
  xs: "matchdb-select-xs",
  sm: "matchdb-select-sm",
  md: "",
};

const VARIANT_CLASS: Record<SelectVariant, string> = {
  default: "",
  toolbar: "matchdb-title-select",
  detail: "matchdb-select-detail",
  finance: "matchdb-select-finance",
};

const Select: React.FC<SelectProps> = ({
  size = "md",
  variant = "default",
  fullWidth,
  className,
  children,
  ...rest
}) => {
  const cls = [
    "matchdb-select",
    SIZE_CLASS[size],
    VARIANT_CLASS[variant],
    fullWidth ? "matchdb-select-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <select className={cls} {...rest}>
      {children}
    </select>
  );
};

export default Select;
