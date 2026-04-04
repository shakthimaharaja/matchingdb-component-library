import React from "react";

export type StackDirection = "row" | "column";
export type StackAlign = "start" | "center" | "end" | "stretch" | "between";
export type StackGap = 0 | 2 | 4 | 6 | 8 | 10 | 12 | 16;
export type StackPad = 0 | 4 | 8 | 12 | 16 | 20 | 24 | 32;

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex direction (default: "column") */
  direction?: StackDirection;
  /** Gap between children */
  gap?: StackGap;
  /** Alignment */
  align?: StackAlign;
  /** Wrap */
  wrap?: boolean;
  /** Padding */
  pad?: StackPad;
  /** flex: 1 */
  fill?: boolean;
  /** min-height: 0 (for nested flex scroll) */
  minH0?: boolean;
  /** Full height */
  fullHeight?: boolean;
  /** Inline flex */
  inline?: boolean;
  children?: React.ReactNode;
}

const GAP_CLASS: Record<number, string> = {
  0: "",
  2: "u-gap-2",
  4: "u-gap-4",
  6: "u-gap-6",
  8: "u-gap-8",
  10: "u-gap-10",
  12: "u-gap-12",
  16: "u-gap-16",
};
const PAD_CLASS: Record<number, string> = {
  0: "u-p-0",
  4: "u-p-4",
  8: "u-p-8",
  12: "u-p-12",
  16: "u-p-16",
  20: "u-p-20",
  24: "u-p-24",
  32: "u-p-32",
};

export default function Stack({
  direction = "column",
  gap,
  align,
  wrap,
  pad,
  fill,
  minH0,
  fullHeight,
  inline,
  className,
  children,
  ...rest
}: StackProps) {
  const cls = [
    inline
      ? "u-inline-flex"
      : direction === "column"
      ? "u-flex-col"
      : align === "between"
      ? "u-flex-between"
      : align === "center"
      ? "u-flex-center"
      : "u-flex",
    gap != null ? GAP_CLASS[gap] || "" : "",
    pad != null ? PAD_CLASS[pad] || "" : "",
    wrap ? "u-flex-wrap" : "",
    fill ? "u-flex-1" : "",
    minH0 ? "u-min-h-0" : "",
    fullHeight ? "u-h-full" : "",
    align === "end" ? "u-flex-end" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls || undefined} {...rest}>
      {children}
    </div>
  );
}
