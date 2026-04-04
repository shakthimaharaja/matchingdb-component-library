/**
 * ThemeSwitcher — toggle between Legacy (W97) and Modern themes.
 */
import React from "react";
import { useTheme, type ThemeMode } from "../../theme";

const modes: { id: ThemeMode; label: string; desc: string }[] = [
  { id: "legacy", label: "W97", desc: "Win 97 retro look" },
  { id: "classic", label: "AWS", desc: "AWS Console look" },
  { id: "modern", label: "SaaS", desc: "Clean SaaS dashboard" },
];

export interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { themeMode, setThemeMode } = useTheme();

  const cls = ["matchdb-theme-switcher", className].filter(Boolean).join(" ");

  return (
    <div className={cls}>
      <span className="matchdb-settings-label">Theme</span>
      <div className="matchdb-theme-options">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`matchdb-theme-option${
              themeMode === m.id ? " matchdb-theme-option-active" : ""
            }`}
            onClick={() => setThemeMode(m.id)}
          >
            <span className="matchdb-theme-option-label">{m.label}</span>
            <span className="matchdb-theme-option-desc">{m.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
