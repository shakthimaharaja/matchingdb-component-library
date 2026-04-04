import React from "react";

export interface FormFieldProps {
  label?: string;
  error?: string;
  success?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  error,
  success,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={className}>
      {label && (
        <label className="matchdb-form-label">
          {label}
          {required && <span className="u-color-error"> *</span>}
        </label>
      )}
      {children}
      {error && <div className="matchdb-form-error">{error}</div>}
      {success && <div className="matchdb-form-success">{success}</div>}
    </div>
  );
}
