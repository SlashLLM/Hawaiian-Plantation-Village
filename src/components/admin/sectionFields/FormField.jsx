import React from 'react';

export default function FormField({ label, children, full = false }) {
  return (
    <label className={`admin-form-field${full ? ' full' : ''}`}>
      {label ? <span className="admin-form-label">{label}</span> : null}
      {children}
    </label>
  );
}
