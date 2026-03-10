/**
 * Toolbar — Win97-styled toolbar row (flex, left/right slots).
 */
import React from "react";

export interface ToolbarProps {
  /** Content aligned left */
  left?: React.ReactNode;
  /** Content aligned right */
  right?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Toolbar: React.FC<ToolbarProps> = ({
  left,
  right,
  className,
  style,
  children,
}) => {
  const cls = ["matchdb-toolbar", className].filter(Boolean).join(" ");
  return (
    <div className={cls} style={style}>
      {left && <div className="matchdb-toolbar-left">{left}</div>}
      {children}
      {right && <div className="matchdb-toolbar-right">{right}</div>}
    </div>
  );
};

export default Toolbar;
