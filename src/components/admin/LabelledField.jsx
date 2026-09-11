import React from 'react';

/**
 * A labelled admin field with optional hint text.
 *
 * Unlike the wrapping-label `FormField`, this associates the control by
 * htmlFor/id, so hint text stays out of the control's accessible name.
 * Use it whenever a field needs help text.
 */
export default function LabelledField({ id, label, hint, hintId, full = false, children }) {
  return (
    <div className={`admin-form-field${full ? ' full' : ''}`}>
      <label className="admin-form-label" htmlFor={id}>{label}</label>
      {children}
      {hint && <small id={hintId} style={{ color: 'var(--text-muted)' }}>{hint}</small>}
    </div>
  );
}
