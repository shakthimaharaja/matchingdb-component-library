/**
 * Shimmer — Animated loading placeholder bar (w97-shimmer class).
 *
 * Sizes: xs (30×8) | sm (60×10) | md (100×12) | lg (160×14) | xl (240×16)
 */
import React from "react";

export type ShimmerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ShimmerProps {
  /** Size preset */
  size?: ShimmerSize;
  className?: string;
}

const SIZE_CLASS: Record<ShimmerSize, string> = {
  xs: "w97-shimmer-xs",
  sm: "w97-shimmer-sm",
  md: "w97-shimmer-md",
  lg: "w97-shimmer-lg",
  xl: "w97-shimmer-xl",
};

const Shimmer: React.FC<ShimmerProps> = ({ size = "sm", className }) => {
  const cls = ["w97-shimmer", SIZE_CLASS[size], className]
    .filter(Boolean)
    .join(" ");
  return <span className={cls} />;
};

export default Shimmer;
