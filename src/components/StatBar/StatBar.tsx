/**
 * StatBar — Row of Win97-styled stat rectangles.
 */
import React from "react";

export interface StatItem {
  key: string;
  icon?: string;
  value: React.ReactNode;
  label: string;
  /** Mark this stat as active (highlighted) */
  active?: boolean;
  /** Smaller sub-stat style */
  sub?: boolean;
}

export interface StatBarProps {
  stats: StatItem[];
  onSelect?: (key: string) => void;
  className?: string;
}

const StatBar: React.FC<StatBarProps> = ({ stats, onSelect, className }) => {
  const cls = ["matchdb-stat-bar", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {stats.map((s) => {
        const rectCls = [
          "matchdb-stat-rect",
          s.sub ? "matchdb-stat-rect-sub" : undefined,
          s.active ? "matchdb-stat-rect-active" : undefined,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={s.key}
            type="button"
            className={rectCls}
            onClick={() => onSelect?.(s.key)}
          >
            {s.icon && <span className="matchdb-stat-icon">{s.icon}</span>}
            <span>
              <span className="matchdb-stat-value">{s.value}</span>
              <span className="matchdb-stat-label">{s.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StatBar;
