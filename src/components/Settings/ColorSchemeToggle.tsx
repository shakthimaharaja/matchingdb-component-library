/**
 * ColorSchemeToggle — choose Light / Dark / Auto colour scheme.
 */
import React from "react";
import { useTheme, type ColorScheme } from "../../theme";

const schemes: { id: ColorScheme; label: string; icon: string }[] = [
  { id: "light", label: "Light", icon: "☀️" },
  { id: "dark", label: "Dark", icon: "🌙" },
  { id: "auto", label: "Auto", icon: "💻" },
];

export interface ColorSchemeToggleProps {
  className?: string;
}

const ColorSchemeToggle: React.FC<ColorSchemeToggleProps> = ({ className }) => {
  const { colorScheme, setColorScheme } = useTheme();

  const cls = ["matchdb-color-scheme-toggle", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      <span className="matchdb-settings-label">Appearance</span>
      <div className="matchdb-color-scheme-options">
        {schemes.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`matchdb-color-scheme-btn${
              colorScheme === s.id ? " matchdb-color-scheme-btn-active" : ""
            }`}
            onClick={() => setColorScheme(s.id)}
          >
            <span className="matchdb-color-scheme-icon">{s.icon}</span>
            <span className="matchdb-color-scheme-label">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSchemeToggle;
