/**
 * TextSizeControl — choose small / medium / large text size.
 */
import React from "react";
import { useTheme, type TextSize } from "../../theme";

const sizes: { id: TextSize; label: string; sample: string }[] = [
  { id: "small", label: "Small", sample: "Aa" },
  { id: "medium", label: "Medium", sample: "Aa" },
  { id: "large", label: "Large", sample: "Aa" },
];

function sampleFontSize(id: TextSize): number {
  if (id === "small") return 12;
  if (id === "large") return 16;
  return 14;
}

export interface TextSizeControlProps {
  className?: string;
}

const TextSizeControl: React.FC<TextSizeControlProps> = ({ className }) => {
  const { textSize, setTextSize } = useTheme();

  const cls = ["matchdb-text-size-control", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      <span className="matchdb-settings-label">Text Size</span>
      <div className="matchdb-text-size-options">
        {sizes.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`matchdb-text-size-btn${
              textSize === s.id ? " matchdb-text-size-btn-active" : ""
            }`}
            onClick={() => setTextSize(s.id)}
          >
            <span
              className="matchdb-text-size-sample"
              style={{ fontSize: sampleFontSize(s.id) }}
            >
              {s.sample}
            </span>
            <span className="matchdb-text-size-label">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TextSizeControl;
