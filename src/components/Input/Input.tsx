/**
 * Input — Win97-styled text input.
 */
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional width override (CSS value) */
  inputWidth?: string | number;
}

const Input: React.FC<InputProps> = ({
  className,
  style,
  inputWidth,
  ...rest
}) => {
  const cls = ["matchdb-input", className].filter(Boolean).join(" ");
  const merged = inputWidth ? { width: inputWidth, ...style } : style;
  return <input className={cls} style={merged} {...rest} />;
};

export default Input;
