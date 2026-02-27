/**
 * Select — Win97-styled dropdown select.
 */
import React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Child <option> elements */
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ className, children, ...rest }) => {
  const cls = ["matchdb-select", className].filter(Boolean).join(" ");
  return (
    <select className={cls} {...rest}>
      {children}
    </select>
  );
};

export default Select;
