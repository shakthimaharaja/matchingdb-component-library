/**
 * Shimmer — Animated loading placeholder bar (w97-shimmer class).
 */
import React from "react";

export interface ShimmerProps {
  /** Width of the shimmer bar in px (default 60) */
  width?: number;
  /** Height of the shimmer bar in px (default 10) */
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Shimmer: React.FC<ShimmerProps> = ({
  width = 60,
  height = 10,
  className,
  style,
}) => {
  const cls = ["w97-shimmer", className].filter(Boolean).join(" ");
  return <span className={cls} style={{ width, height, ...style }} />;
};

export default Shimmer;
