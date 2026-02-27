/**
 * Tabs — Win97-styled tab bar.
 */
import React from "react";

export interface Tab {
  key: string;
  label: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onSelect: (key: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeKey,
  onSelect,
  className,
}) => {
  const cls = ["matchdb-tabs", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          className={`matchdb-tab${
            t.key === activeKey ? " matchdb-tab-active" : ""
          }`}
          onClick={() => onSelect(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
