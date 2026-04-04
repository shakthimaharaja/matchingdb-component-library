/**
 * Input — Win97-styled text input.
 *
 * Sizes:     xs | sm | md (default)
 * Variants:  default | search | note | finance-search | modern
 * fullWidth: stretches to 100% of parent
 */
import React from "react";

export type InputSize = "xs" | "sm" | "md";
export type InputVariant =
  | "default"
  | "search"
  | "note"
  | "finance-search"
  | "modern";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size variant */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Stretch to full width of parent */
  fullWidth?: boolean;
}

const SIZE_CLASS: Record<InputSize, string> = {
  xs: "matchdb-input-xs",
  sm: "matchdb-input-sm",
  md: "",
};

const VARIANT_CLASS: Record<InputVariant, string> = {
  default: "",
  search: "matchdb-title-search",
  note: "matchdb-input-note",
  "finance-search": "matchdb-input-finance-search",
  modern: "rm-input",
};

const Input: React.FC<InputProps> = ({
  size = "md",
  variant = "default",
  fullWidth,
  className,
  ...rest
}) => {
  const cls = [
    "matchdb-input",
    SIZE_CLASS[size],
    VARIANT_CLASS[variant],
    fullWidth ? "matchdb-input-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <input className={cls} {...rest} />;
};

export default Input;
