import React from "react";

/* ── Size map ──────────────────────────────────────────────────────────────── */
const SIZE_CLASS: Record<string, string> = {
  9: "u-fs-9",
  10: "u-fs-10",
  11: "u-fs-11",
  12: "u-fs-12",
  13: "u-fs-13",
  14: "u-fs-14",
  16: "u-fs-16",
  18: "u-fs-18",
  20: "u-fs-20",
  24: "u-fs-24",
  28: "u-fs-28",
  36: "u-fs-36",
  40: "u-fs-40",
  48: "u-fs-48",
  52: "u-fs-52",
};

/* ── Weight map ────────────────────────────────────────────────────────────── */
const WEIGHT_CLASS: Record<string, string> = {
  400: "u-fw-400",
  500: "u-fw-500",
  600: "u-fw-600",
  700: "u-fw-700",
  800: "u-fw-800",
};

/* ── Color map ─────────────────────────────────────────────────────────────── */
const COLOR_CLASS: Record<string, string> = {
  text: "u-color-text",
  secondary: "u-color-text-secondary",
  muted: "u-color-muted",
  placeholder: "u-color-placeholder",
  hint: "u-color-hint",
  link: "u-color-link",
  "link-alt": "u-color-link-alt",
  navy: "u-color-navy",
  blue: "u-color-blue",
  teal: "u-color-teal",
  green: "u-color-green",
  red: "u-color-red",
  error: "u-color-error",
  "error-light": "u-color-error-light",
  success: "u-color-success",
  white: "u-color-white",
  "section-heading": "u-color-section-heading",
  "info-label": "u-color-info-label",
};

export type TextSize =
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 16
  | 18
  | 20
  | 24
  | 28
  | 36
  | 40
  | 48
  | 52;
export type TextWeight = 400 | 500 | 600 | 700 | 800;
export type TextColor = keyof typeof COLOR_CLASS;
export type TextTransform = "uppercase" | "capitalize" | "none";
export type TextAs =
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "div"
  | "label"
  | "strong"
  | "em"
  | "small"
  | "pre";

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** HTML element to render (default: "span") */
  as?: TextAs;
  /** Font size */
  size?: TextSize;
  /** Font weight */
  weight?: TextWeight;
  /** Semantic color token */
  color?: TextColor;
  /** Text transform */
  transform?: TextTransform;
  /** Truncate with ellipsis */
  truncate?: boolean;
  /** No-wrap */
  nowrap?: boolean;
  /** Monospace */
  mono?: boolean;
  /** Italic */
  italic?: boolean;
  /** Pre-wrap whitespace */
  preWrap?: boolean;
  /** Margin-bottom in px */
  mb?: number;
  /** Margin-top in px */
  mt?: number;
  children?: React.ReactNode;
}

const MB_CLASS: Record<number, string> = {
  0: "u-m-0",
  2: "u-mb-2",
  3: "u-mb-3",
  4: "u-mb-4",
  6: "u-mb-6",
  8: "u-mb-8",
  12: "u-mb-12",
  16: "u-mb-16",
  24: "u-mb-24",
};
const MT_CLASS: Record<number, string> = {
  2: "u-mt-2",
  4: "u-mt-4",
  6: "u-mt-6",
  8: "u-mt-8",
  10: "u-mt-10",
  14: "u-mt-14",
  16: "u-mt-16",
  20: "u-mt-20",
};

export default function Text({
  as: Tag = "span",
  size,
  weight,
  color,
  transform,
  truncate,
  nowrap,
  mono,
  italic,
  preWrap,
  mb,
  mt,
  className,
  children,
  ...rest
}: TextProps) {
  const cls = [
    size != null ? SIZE_CLASS[size] : "",
    weight != null ? WEIGHT_CLASS[weight] : "",
    color ? COLOR_CLASS[color] || "" : "",
    transform === "uppercase"
      ? "u-uppercase"
      : transform === "capitalize"
      ? "u-capitalize"
      : "",
    truncate ? "u-truncate" : "",
    nowrap ? "u-nowrap" : "",
    mono ? "u-font-mono" : "",
    italic ? "u-italic" : "",
    preWrap ? "u-pre-wrap" : "",
    mb != null ? MB_CLASS[mb] || "" : "",
    mt != null ? MT_CLASS[mt] || "" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={cls || undefined} {...rest}>
      {children}
    </Tag>
  );
}
