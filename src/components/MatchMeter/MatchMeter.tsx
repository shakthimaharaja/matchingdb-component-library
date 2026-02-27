/**
 * MatchMeter — Win97-styled progress-bar meter.
 *
 * Usage:
 *   <MatchMeter label="65%" value={65} />
 *   <MatchMeter label="90%" value={90} variant="high" />
 */
import React from "react";

export type MeterVariant = "default" | "high" | "mid" | "low";

export interface MatchMeterProps {
  /** Percentage value 0–100 */
  value: number;
  /** Text label (e.g. "65%") */
  label?: string;
  /** Colour variant — auto-selects based on value when omitted */
  variant?: MeterVariant;
  className?: string;
  style?: React.CSSProperties;
}

function autoVariant(v: number): MeterVariant {
  if (v >= 75) return "high";
  if (v >= 40) return "mid";
  return "low";
}

const fillClass: Record<MeterVariant, string> = {
  default: "matchdb-meter-fill",
  high: "matchdb-meter-fill matchdb-meter-fill-high",
  mid: "matchdb-meter-fill matchdb-meter-fill-mid",
  low: "matchdb-meter-fill matchdb-meter-fill-low",
};

const MatchMeter: React.FC<MatchMeterProps> = ({
  value,
  label,
  variant,
  className,
  style,
}) => {
  const v = Math.max(0, Math.min(100, value));
  const resolved = variant ?? autoVariant(v);
  const cls = ["matchdb-meter", className].filter(Boolean).join(" ");

  return (
    <div className={cls} style={style}>
      <div className="matchdb-meter-row">
        {label !== undefined && (
          <span className="matchdb-meter-label">{label}</span>
        )}
        <span className="matchdb-meter-track">
          <span className={fillClass[resolved]} style={{ width: `${v}%` }} />
        </span>
      </div>
    </div>
  );
};

export default MatchMeter;
