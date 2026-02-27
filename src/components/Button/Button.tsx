/**
 * Button — Win97-styled button component.
 *
 * Variants: default | primary | poke | email | expand | download | close | reopen | matches
 * Sizes:    xs | sm | md (default)
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
  | "matches";

export type ButtonSize = "xs" | "sm" | "md";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
};

const sizeStyle: Record<ButtonSize, React.CSSProperties | undefined> = {
  xs: { height: 18, fontSize: 10, padding: "0 4px" },
  sm: { height: 22, fontSize: 11, padding: "0 6px" },
  md: undefined,
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  className,
  style,
  children,
  ...rest
}) => {
  const cls = [variantClass[variant], className].filter(Boolean).join(" ");
  const mergedStyle = { ...sizeStyle[size], ...style };
  return (
    <button type="button" className={cls} style={mergedStyle} {...rest}>
      {children}
    </button>
  );
};

export default Button;
