/**
 * AppearanceSettings — combines ThemeSwitcher + ColorSchemeToggle + TextSizeControl
 * into a single panel that can be rendered in a settings page or modal.
 */
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import TextSizeControl from "./TextSizeControl";
import ColorSchemeToggle from "./ColorSchemeToggle";

export interface AppearanceSettingsProps {
  className?: string;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  className,
}) => {
  const cls = ["matchdb-appearance-settings", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      <h3 className="matchdb-appearance-title">Appearance</h3>
      <div className="matchdb-appearance-sections">
        <ThemeSwitcher />
        <ColorSchemeToggle />
        <TextSizeControl />
      </div>
    </div>
  );
};

export default AppearanceSettings;
