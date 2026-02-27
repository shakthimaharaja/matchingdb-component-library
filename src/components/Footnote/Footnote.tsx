/**
 * Footnote — Win97-styled status-bar row at the bottom of a panel.
 */
import React from "react";

export interface FootnoteProps {
  children: React.ReactNode;
  className?: string;
}

const Footnote: React.FC<FootnoteProps> = ({ children, className }) => {
  const cls = ["matchdb-footnote", className].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
};

/** Vertical separator used between footnote segments. */
export const FootnoteSep: React.FC = () => (
  <span className="matchdb-footnote-sep">|</span>
);

export default Footnote;
