/**
 * Panel — Win97-styled panel with optional gradient title bar.
 * Wraps child content in the .matchdb-panel container.
 */
import React from "react";

export interface PanelProps {
  /** Title text */
  title?: string;
  /** Emoji / icon before title */
  titleIcon?: string;
  /** Meta text on the right of the title bar */
  titleMeta?: React.ReactNode;
  /** Extra JSX in the title bar (between title text and meta) */
  titleExtra?: React.ReactNode;
  /** Content */
  children: React.ReactNode;
  className?: string;
}

const Panel: React.FC<PanelProps> = ({
  title,
  titleIcon,
  titleMeta,
  titleExtra,
  children,
  className,
}) => {
  const cls = ["matchdb-panel", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {(title || titleIcon) && (
        <div className="matchdb-panel-title">
          <div className="matchdb-panel-title-left">
            {titleIcon && (
              <span className="matchdb-panel-title-icon">{titleIcon}</span>
            )}
            {title && <span className="matchdb-panel-title-text">{title}</span>}
            {titleExtra}
          </div>
          {titleMeta && (
            <div className="matchdb-panel-title-right">
              <span className="matchdb-panel-title-meta">{titleMeta}</span>
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Panel;
