/**
 * Button — Win97-styled button component.
 *
 * Variants: default | primary | poke | email | expand | download | close |
 *           reopen | matches | detail | detail-pdf | detail-send |
 *           title-icon | modal-close | danger | muted | cta
 * Sizes:    xs | sm | md (default)
 * Layout:   fullWidth | fill
 */
import React from "react";

export type ButtonVariant =
  | "default"
  | "primary"
  | "poke"
  | "email"
  | "expand"
  | "download"
  | "close"
  | "reopen"
  | "matches"
  | "detail"
  | "detail-pdf"
  | "detail-send"
  | "title-icon"
  | "modal-close"
  | "danger"
  | "muted"
  | "cta";

export type ButtonSize = "xs" | "sm" | "md";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  fill?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  default: "matchdb-btn",
  primary: "matchdb-btn matchdb-btn-primary",
  poke: "matchdb-btn matchdb-btn-poke",
  email: "matchdb-btn matchdb-btn-email",
  expand: "matchdb-btn-expand",
  download: "matchdb-btn matchdb-btn-download",
  close: "matchdb-btn vdp-btn-close",
  reopen: "matchdb-btn vdp-btn-reopen",
  matches: "matchdb-btn vdp-btn-matches",
  detail: "detail-btn",
  "detail-pdf": "detail-btn detail-btn-pdf",
  "detail-send": "detail-btn detail-btn-send",
  "title-icon": "matchdb-btn matchdb-btn-xs matchdb-title-btn",
  "modal-close": "detail-modal-close",
  danger: "matchdb-btn matchdb-btn-danger",
  muted: "matchdb-btn matchdb-btn-muted",
  cta: "matchdb-btn matchdb-btn-primary matchdb-btn-cta",
};

const sizeClass: Record<ButtonSize, string> = {
  xs: "matchdb-btn-xs",
  sm: "matchdb-btn-sm",
  md: "",
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  fullWidth,
  fill,
  className,
  children,
  ...rest
}) => {
  const cls = [
    variantClass[variant],
    sizeClass[size],
    fullWidth ? "matchdb-btn-full" : "",
    fill ? "matchdb-btn-fill" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
};

export default Button;
